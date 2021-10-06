import { Field, Entity, IdEntity, Validators, BackendMethod, Remult, Allow } from "remult";
import { Roles } from "./roles";

@Entity("tasks", {
    allowApiRead: Allow.authenticated,
    allowApiUpdate: Allow.authenticated,
    allowApiInsert: Roles.admin,
    allowApiDelete: Roles.admin
})
export class Task extends IdEntity {
    @Field({
        validate: Validators.required,
        allowApiUpdate: Roles.admin
    })
    title: string = '';
    @Field()
    completed: boolean = false;

    @BackendMethod({ allowed: Roles.admin })
    static async setAll(completed: boolean, remult?: Remult) {
        for await (const task of remult!.repo(Task).iterate()) {
            task.completed = completed;
            await task.save();
        }
    }
}
