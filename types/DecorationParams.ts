import type { Theme } from "@emotion/react"
import { Line } from "./Line"
import { Member } from "./Member"
import { SetterOrUpdater } from "recoil"
import { FieldValues, UseFormReturn } from "react-hook-form"

export interface DecorationParams {
    mid: string
    member: Member
    line: Line
    theme: Theme
    form: UseFormReturn<FieldValues, any, undefined>
    methods: any
    [key: string]: any
}