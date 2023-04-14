import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AdminAccessSet } from "../generated/schema"
import { AdminAccessSet as AdminAccessSetEvent } from "../generated/Contract/Contract"
import { handleAdminAccessSet } from "../src/contract"
import { createAdminAccessSetEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _admin = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _enabled = "boolean Not implemented"
    let newAdminAccessSetEvent = createAdminAccessSetEvent(_admin, _enabled)
    handleAdminAccessSet(newAdminAccessSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AdminAccessSet created and stored", () => {
    assert.entityCount("AdminAccessSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AdminAccessSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_admin",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AdminAccessSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_enabled",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
