export interface Config {
    company: string;
    module: string;
    status: string;
    liffId: string;
    logo: string;
    nMembers: number;
    display: Display;
    config: ConfigClass;
    memberCard: MemberCard;
    redemption: Redemption;
    hasWarrantyModule: boolean;
    warrantyCard: WarrantyCard;
    needActivation: boolean;
    alias: string;
    affiliate: Affiliate;
    isDataslotPointConvertable: boolean;
    registerForm: RegisterForm;
    colorPalette: ColorPalette;
    liff: Liff;
    store: Store;
}

export interface Affiliate {
    bgImgUrl: string;
}

export interface ColorPalette {
    secondary: any[];
    tertiary: any[];
    quaternary: any[];
    primary: string[];
}

export interface ConfigClass {
    claim: Claim;
    maintenance: Claim;
    ui: UI;
    shippingAmount: number;
    freeShippingAmount: number;
    warehouse:{
        code:string
    }
}

export interface Claim {
    workflow: Workflow;
}

export interface Workflow {
    id: string;
}

export interface UI {
    navbar:any,
    color: string[];
    pages: Pages;
    components: any
}

export interface Pages {
    register: Register;
    home:any
}

export interface Register {
    background: string;
    contents: RegisterContent[];
}

export interface RegisterContent {
    contents: PurpleContent[];
    styles: FluffyStyles;
}

export interface PurpleContent {
    content?: string[] | FluffyContent | string;
    type: string;
    styles?: PurpleStyles;
    variable?: string;
    disabled?: string;
    label?: string;
    onClick?: string;
    contents?: InputForm[];
}

export interface FluffyContent {
    contents: Choice[];
    topic: string;
    type: string;
}

export interface Choice {
    imageUrl: string;
    label: string;
    type?: Type;
}

export enum Type {
    Choice = "choice",
    Textarea = "textarea",
}

export interface InputForm {
    placeholder: string;
    topic: string;
    type: string;
    variable: string;
}

export interface PurpleStyles {
    padding?: string;
    color?: string;
    margin?: string;
    marginBottom?: string;
    width?: string;
}

export interface FluffyStyles {
    paddingTop?: string;
    padding?: string;
}

export interface Display {
    totalPurchase: boolean;
    totalPoint: boolean;
    memberNumber: boolean;
    affiliate: boolean;
}

export interface Liff {
    preview: string;
    production: string;
    development: string;
}

export interface MemberCard {
    background: string;
    card: Card;
    tiers?: any
    position?: any
}

export interface Card {
    back: string;
    front: string;
}

export interface Redemption {
    multiplier: number;
    ratio: number;
}

export interface RegisterForm {
    questions: Question[];
    inputForm: InputForm[];
    greeting: Greeting;
}

export interface Greeting {
    topic: string;
    descriptions: string[];
}

export interface Question {
    choices: Choice[];
    topic: string;
}

export interface Store {
    heroImgUrl: string;
}

export interface WarrantyCard {
    background: string;
}
