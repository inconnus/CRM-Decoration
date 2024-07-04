import { Config } from "@/types/Config";
import { Line } from "@/types/Line";
import { Member } from "@/types/Member";
import { PMS } from "@/types/PMS";
import { UIConfig } from "@/types/UIConnfig";
import React from "react";
import { createContext } from "react";
import { SWRResponse } from "swr";

export const Register = createContext<any>({})
export const AppContext = createContext<any>({
    loading: [false, () => { }],
    ready: [false, () => { }],
    cart: [[], () => { }],
    mutate: null,
    scroll: 0,
    setScroll: () => { }
})
export const PageContext = createContext<any>({})
export const NavigationContext = createContext<any>({})
export const ModuleContext = createContext<any>({
    ui: {},
    member: {},
    line: {},
    config: {},
    pms: {}
})

export const PolicyContext = createContext<any>({})