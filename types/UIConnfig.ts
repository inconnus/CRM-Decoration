// To parse this data:
//
//   import { Convert, UIConfig } from "./file";
//
//   const uIConfig = Convert.toUIConfig(json);

export interface UIConfig {
    colors?: string[];
    navbar?: Navbar;
    pages?:  Pages;
}

export interface Navbar {
}

export interface Pages {
    home?:     Home;
    register?: Register;
}

export interface Home {
    background?: Background;
    contents?:   HomeContent[];
}

export interface Background {
    color?:  string;
    image?:  string;
    mode?:   string;
    repeat?: string;
    size?:   string;
}

export interface HomeContent {
    id?:     string;
    type?:   string;
    params?: PurpleParams;
}

export interface PurpleParams {
    content?:   string;
    navigator?: Navigator;
    type?:      string;
}

export interface Navigator {
    href?: string;
    type?: string;
}

export interface Register {
    background?: string;
    contents?:   RegisterContent[];
}

export interface RegisterContent {
    contents?: PurpleContent[];
    styles?:   FluffyStyles;
}

export interface PurpleContent {
    content?:  string[] | FluffyContent | string;
    type?:     string;
    styles?:   PurpleStyles;
    variable?: string;
    params?:   FluffyParams;
    contents?: StickyContent[];
}

export interface FluffyContent {
    contents?: TentacledContent[];
    topic?:    string;
    type?:     string;
    subTopic?: string;
}

export interface TentacledContent {
    imageUrl?: string;
    label?:    string;
    type?:     string;
}

export interface StickyContent {
    placeholder?: string;
    topic?:       string;
    type?:        string;
    variable?:    string;
}

export interface FluffyParams {
    action?:    string;
    condition?: string[];
    label?:     string;
    button?:    Button;
    age?:       Age;
}

export interface Age {
    style?: AgeStyle;
}

export interface AgeStyle {
    backgroundColor?: string;
    color?:           string;
}

export interface Button {
    style?: ButtonStyle;
}

export interface ButtonStyle {
    backgroundColor?: string;
    color?:           string;
    fonsSize?:        string;
    height?:          string;
}

export interface PurpleStyles {
    padding?:      string;
    color?:        string;
    margin?:       string;
    marginBottom?: string;
    width?:        string;
}

export interface FluffyStyles {
    paddingTop?: string;
    padding?:    string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toUIConfig(json: string): UIConfig {
        return JSON.parse(json);
    }

    public static uIConfigToJson(value: UIConfig): string {
        return JSON.stringify(value);
    }
}
