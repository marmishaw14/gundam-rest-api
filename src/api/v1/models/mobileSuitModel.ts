/**
 * Types of artillery (beam weapons, physical projectiles, melee weapons)
 */
export type ArtilleryType = "beam" | "projectile" | "melee";

/**
 * Types of deployment status (active, in-repair, retired)
 */
export type DeploymentStatus = "active" | "in-repair" | "retired";

/**
 * Types of Gundam Universe timelines
 */
export type Timeline = "Universal Century" | 
"Future Century" | 
"After Colony/Mars Century" | 
"After War" | 
"Correct Century" | 
"Cosmic Era" | 
"Anno Domini" | 
"Advanced Generation" | 
"Reglid Century" | 
"Post Disaster" | 
"Ad Stella" | 
"Tenpou Era"

/**
 * Interface representing a mobile suit and its properties
 */
export interface MobileSuit {
    id: string;
    mobileSuitName: string;
    artilleryType: ArtilleryType;
    status: DeploymentStatus;
    timeline: Timeline;
    pilotId: string;
    manufacturedAt: Date;
}