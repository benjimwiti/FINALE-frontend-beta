export interface NavigatorWithBrave extends Navigator {
    brave?: any;
}

export function isBraveBrowser() {
    const hasBraveProperty =
        (navigator as NavigatorWithBrave).brave !== undefined;
    hasBraveProperty
        ? console.log("Using Brave Browser")
        : console.log(`not Using Brave Browser`);
    }
