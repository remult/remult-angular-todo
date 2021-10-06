import { Field, Entity, IdEntity, Validators, BackendMethod, Remult, Allow } from "remult";

@Entity("tasks", {
    allowApiCrud: Allow.authenticated
})
export class Task extends IdEntity {
    @Field({
        validate: Validators.required
    })
    title: string = '';
    @Field()
    completed: boolean = false;

    @BackendMethod({ allowed: Allow.authenticated })
    static async setAll(completed: boolean, remult?: Remult) {
        for await (const task of remult!.repo(Task).iterate()) {
            task.completed = completed;
            await task.save();
        }
    }
}
