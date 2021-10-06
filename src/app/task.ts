import { Field, Entity, IdEntity, Validators, BackendMethod, Remult } from "remult";

@Entity("tasks", {
    allowApiCrud: true
})
export class Task extends IdEntity {
    @Field({
        validate: Validators.required
    })
    title: string = '';
    @Field()
    completed: boolean = false;

    @BackendMethod({ allowed: true })
    static async setAll(completed: boolean, remult?: Remult) {
        for await (const task of remult!.repo(Task).iterate()) {
            task.completed = completed;
            await task.save();
        }
    }
}
