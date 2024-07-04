import type { Theme } from "@emotion/react"
import { Line } from "./Line"
import { Member } from "./Member"
import { SetterOrUpdater } from "recoil"

export interface DecorationParams {
    mid: string
    member: Member
    line: Line
    theme: Theme
    context: [any, SetterOrUpdater<any>]
    [key: string]: any
}