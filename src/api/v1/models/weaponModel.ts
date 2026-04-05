/**
 * Types of weapons that are available for mobile suits to use.
 */
export type WeaponType =
"beam-saber" |
"beam-rifle" |
"beam-sniper" |
"beam-gatling" |
"missile-launcher" |
"rocket-launcher" |
"machine-gun" |
"gatling-gun" |
"railgun" |
"shield" |
"melee"

/**
 * Types of weapon rarities ranging from common to legendary.
 */
export type WeaponRarity =
"common" |
"uncommon" |
"rare" |
"ultra-rare" |
"legendary"

/**
 * Interface representing a weapon and its properties that are used by mobile suits.
 */
export interface Weapon {
    weaponId: string;
    weaponName: string;
    type: WeaponType;
    damage: number;
    range: number;
    energyCost: number;
    ammoCapacity: number;
    weaponRarity: WeaponRarity;
};