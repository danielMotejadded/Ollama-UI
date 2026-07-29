import { Guid } from "./Guid"

export type Message = {
    id: Guid
    role: "user" | "assistant"
    content: string
}
//
export type Chat = {
    id: Guid,
    title: string,
    messages: Message[],
    context: number[] | null
}