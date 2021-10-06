import { Field, Entity, IdEntity } from "remult";

@Entity("tasks", {
    allowApiCrud: true
})
export class Task extends IdEntity {
    @Field()
    title: string = '';
    @Field()
    completed: boolean = false;
}
