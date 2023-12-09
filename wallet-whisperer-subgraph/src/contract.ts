import {
  DiscordIdMinted as DiscordIdMintedEvent,
} from "../generated/Contract/Contract"
import {
  DiscordId
} from "../generated/schema"
// import { BigInt } from "@graphprotocol/graph-ts"

function loadOrCreateDiscordId(discordId: string): DiscordId {
  let entity= DiscordId.load(discordId)
  if (entity == null) {
    entity = new DiscordId(discordId)
  }
  return entity as DiscordId
}


export function handleDiscordIdMinted(event: DiscordIdMintedEvent): void {
  let entity = loadOrCreateDiscordId(event.params.discordId.toString())
  entity.discordId = event.params.discordId
  entity.tokenId = event.params.tokenId
  entity.walletAddress = event.params.to
  entity.save()
}

