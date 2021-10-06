import { Field, Entity, IdEntity, Validators } from "remult";

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
}
