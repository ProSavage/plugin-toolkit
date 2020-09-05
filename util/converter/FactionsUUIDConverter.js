export const convertFactions = async (players, file) => {
  console.log("started converting factions...");
  const fileReader = new FileReader();
  const convertedData = {};
  let highestID = 0;
  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new DOMException("Problem parsing file"));
    };
    fileReader.onload = (event) => {
      const now = performance.now() + performance.timeOrigin;
      const data = JSON.parse(event.target.result);
      const idKeys = Object.keys(data);
      for (const id of idKeys) {
        const faction = data[id];
        const members = []
        let leader;
        const playerIDs = Object.keys(players)
        for (const playerID of playerIDs) {
            const player = players[playerID]
            if (player.currentFactionID === id) {
                members.push(player.uuid)
                if (player.role.roleTag === "Leader") {
                    leader = player.uuid
                }
            }
        }

        const idInt = parseInt(id)
        if (idInt > highestID) highestID = idInt;
        convertedData[id] = {
          // FactionsX will find this from leader's date.
          creationDate: null,
          factionMembers: members,
          relations: {},
          warps: {},
          description: faction.description,
          maxPowerBoost: faction.powerBoost,
          globalUpgrades: {},
          strikes: [],
          warpBoost: 0,
          allyBoost: 0,
          enemyBoost: 0,
          memberBoost: 0,
          shielded: false,
          claimUpgrades: {},
          // TODO: Move grid first
          claimAmt: 0,
          openStatus: false,
          discord: "N/A",
          paypal: "N/A",
          bank: {
              amount: 0.0,
              nextId: 1,
              logs: []
          },
          id: idInt,
          tag: faction.tag,
          factionRoles: allRoles,
          relationPerms: relationPerms,
          ownerId: leader
        };
      }
      const finished = performance.now() + performance.timeOrigin;
      const time = finished - now;
      console.log("factions:", time, "nanos", "amount", idKeys.length);
      resolve({ time, data: {nextFactionId: highestID,factions: convertedData} });
    };
    fileReader.readAsText(file);
  });
};

export const convertPlayers = async (file) => {
  console.log("started converting players...");
  const fileReader = new FileReader();
  const convertedData = {};
  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new DOMException("Problem parsing file"));
    };
    fileReader.onload = (event) => {
      const now = performance.now() + performance.timeOrigin;
      const data = JSON.parse(event.target.result);
      const UUIDKeys = Object.keys(data);
      for (const uuid of UUIDKeys) {
        const player = data[uuid];
        let role;
        if (player.role === "ADMIN") {
          role = leaderRole;
        } else {
          role = normalRole;
        }
        convertedData[uuid] = {
          // can be migrated, but dont wanna cause issues.
          chatMode: "PUBLIC",
          isFFlying: false,
          confirmAction: {
            status: false,
            action: "NONE",
          },
          // We call title prefix in factionsx.
          prefix: player.title,
          role: role,
          timeAtLastLogin: player.lastLoginTime,
          lastPowerUpdate: player.lastPowerUpdateTime,
          teleportToSpawnOnLogin: false,
          credits: 0,
          power: player.power,
          powerBoost: player.powerBoost,
          currentFactionID: player.factionId,
          factionsInvitedTo: [],
          // can be migrated, but just turn it on again pepega.
          showChunkBorders: false,
          chunkBorderColor: {
            r: 1,
            g: 153,
            b: 51,
          },
          uuid: player.id,
          name: player.name,
        };
      }
      const finished = performance.now() + performance.timeOrigin;
      const time = finished - now;
      console.log("fplayers:", time, "nanos", "amount", UUIDKeys.length);
      resolve({
        time,
        data: { nextFPlayerId: UUIDKeys.length, fplayers: convertedData },
      });
    };
    fileReader.readAsText(file);
  });
};

const allRoles = {
    "roleHierarchy": {
        "4": {
            "chatTag": "***",
            "roleTag": "Leader",
            "allowedPlayerActions": [
                "HURT_MOB",
                "BUTTON",
                "LEVER",
                "PRESSURE_PLATE",
                "FENCE_GATE",
                "TRAPDOOR",
                "HOOK",
                "HOPPER",
                "LECTERN",
                "COMPARATOR",
                "REPEATER",
                "DISPENSER",
                "DOOR",
                "CHEST",
                "ENDER_CHEST",
                "ANVIL",
                "BREWING_STAND",
                "ENCHANTING_TABLE",
                "FURNACE",
                "DROPPER",
                "CAULDRON",
                "SPAWN_EGG",
                "BREAK_BLOCK",
                "PLACE_BLOCK",
                "EMPTY_BUCKET",
                "FILL_BUCKET",
                "USE_BLACKLISTED_BLOCKS",
                "USE_ENTITY"
            ],
            "allowedMemberActions": [
                "KICK",
                "DISBAND",
                "INVITE",
                "DEINVITE",
                "DEMOTE",
                "PREFIX",
                "RENAME",
                "UNCLAIMALL",
                "CHANGE_DESCRIPTION",
                "FLY",
                "HOME",
                "SETHOME",
                "CLAIM",
                "UNCLAIM",
                "WARP",
                "SET_WARP",
                "DEL_WARP",
                "VIEW_WARP_PASSWORD",
                "RELATION",
                "OPEN",
                "PAYPAL_SET",
                "DISCORD_SET",
                "PROMOTE",
                "BANK_WITHDRAW",
                "BANK_DEPOSIT",
                "BANK_PAY",
                "BANK_LOGS"
            ],
            "specialActions": {},
            "iconMaterial": "DIAMOND_HELMET"
        },
        "3": {
            "chatTag": "**",
            "roleTag": "Administrator",
            "allowedPlayerActions": [
                "HURT_MOB",
                "BUTTON",
                "LEVER",
                "PRESSURE_PLATE",
                "FENCE_GATE",
                "TRAPDOOR",
                "HOOK",
                "HOPPER",
                "LECTERN",
                "COMPARATOR",
                "REPEATER",
                "DISPENSER",
                "DOOR",
                "CHEST",
                "ENDER_CHEST",
                "ANVIL",
                "BREWING_STAND",
                "ENCHANTING_TABLE",
                "FURNACE",
                "DROPPER",
                "CAULDRON",
                "SPAWN_EGG",
                "BREAK_BLOCK",
                "PLACE_BLOCK",
                "EMPTY_BUCKET",
                "FILL_BUCKET",
                "USE_BLACKLISTED_BLOCKS",
                "USE_ENTITY"
            ],
            "allowedMemberActions": [
                "KICK",
                "INVITE",
                "DEINVITE",
                "DEMOTE",
                "PREFIX",
                "RENAME",
                "UNCLAIMALL",
                "CHANGE_DESCRIPTION",
                "FLY",
                "HOME",
                "SETHOME",
                "CLAIM",
                "UNCLAIM",
                "WARP",
                "SET_WARP",
                "DEL_WARP",
                "VIEW_WARP_PASSWORD",
                "RELATION",
                "OPEN",
                "PAYPAL_SET",
                "DISCORD_SET",
                "PROMOTE",
                "BANK_WITHDRAW",
                "BANK_DEPOSIT",
                "BANK_PAY",
                "BANK_LOGS"
            ],
            "specialActions": {},
            "iconMaterial": "IRON_HELMET"
        },
        "2": {
            "chatTag": "*",
            "roleTag": "Moderator",
            "allowedPlayerActions": [
                "HURT_MOB",
                "BUTTON",
                "LEVER",
                "PRESSURE_PLATE",
                "FENCE_GATE",
                "TRAPDOOR",
                "HOOK",
                "HOPPER",
                "LECTERN",
                "COMPARATOR",
                "REPEATER",
                "DISPENSER",
                "DOOR",
                "CHEST",
                "ENDER_CHEST",
                "ANVIL",
                "BREWING_STAND",
                "ENCHANTING_TABLE",
                "FURNACE",
                "DROPPER",
                "CAULDRON",
                "SPAWN_EGG",
                "BREAK_BLOCK",
                "PLACE_BLOCK",
                "EMPTY_BUCKET",
                "FILL_BUCKET",
                "USE_BLACKLISTED_BLOCKS",
                "USE_ENTITY"
            ],
            "allowedMemberActions": [
                "INVITE",
                "KICK",
                "PROMOTE",
                "RELATION"
            ],
            "specialActions": {},
            "iconMaterial": "GOLDEN_HELMET"
        },
        "1": {
            "chatTag": "+",
            "roleTag": "Member",
            "allowedPlayerActions": [
                "HURT_MOB",
                "BUTTON",
                "LEVER",
                "PRESSURE_PLATE",
                "FENCE_GATE",
                "TRAPDOOR",
                "HOOK",
                "HOPPER",
                "LECTERN",
                "COMPARATOR",
                "REPEATER",
                "DISPENSER",
                "DOOR",
                "CHEST",
                "ENDER_CHEST",
                "ANVIL",
                "BREWING_STAND",
                "ENCHANTING_TABLE",
                "FURNACE",
                "DROPPER",
                "CAULDRON",
                "SPAWN_EGG",
                "BREAK_BLOCK",
                "PLACE_BLOCK",
                "EMPTY_BUCKET",
                "FILL_BUCKET",
                "USE_BLACKLISTED_BLOCKS",
                "USE_ENTITY"
            ],
            "allowedMemberActions": [],
            "specialActions": {},
            "iconMaterial": "CHAINMAIL_HELMET"
        },
        "0": {
            "chatTag": "-",
            "roleTag": "Recruit",
            "allowedPlayerActions": [
                "BREAK_BLOCK",
                "PLACE_BLOCK"
            ],
            "allowedMemberActions": [],
            "specialActions": {},
            "iconMaterial": "LEATHER_HELMET"
        }
    }
}

const relationPerms = {
    "info": {
        "ALLY": {
            "USE_ENTITY": false,
            "BREWING_STAND": false,
            "HURT_PLAYER": false,
            "BUTTON": false,
            "REPEATER": false,
            "ENDER_CHEST": false,
            "TRAPDOOR": false,
            "PLACE_BLOCK": false,
            "DISPENSER": false,
            "FILL_BUCKET": false,
            "BREAK_BLOCK": false,
            "DROPPER": false,
            "PRESSURE_PLATE": false,
            "LECTERN": false,
            "FENCE_GATE": false,
            "COMPARATOR": false,
            "EMPTY_BUCKET": false,
            "USE_BLACKLISTED_BLOCKS": false,
            "HOOK": false,
            "FURNACE": false,
            "HOPPER": false,
            "DOOR": false,
            "CHEST": false,
            "ANVIL": false,
            "SPAWN_EGG": false,
            "LEVER": false,
            "ENCHANTING_TABLE": false,
            "HURT_MOB": false,
            "CAULDRON": false
        },
        "NEUTRAL": {
            "USE_ENTITY": false,
            "BREWING_STAND": false,
            "HURT_PLAYER": false,
            "BUTTON": false,
            "REPEATER": false,
            "ENDER_CHEST": false,
            "TRAPDOOR": false,
            "PLACE_BLOCK": false,
            "DISPENSER": false,
            "FILL_BUCKET": false,
            "BREAK_BLOCK": false,
            "DROPPER": false,
            "PRESSURE_PLATE": false,
            "LECTERN": false,
            "FENCE_GATE": false,
            "COMPARATOR": false,
            "EMPTY_BUCKET": false,
            "USE_BLACKLISTED_BLOCKS": false,
            "HOOK": false,
            "FURNACE": false,
            "HOPPER": false,
            "DOOR": false,
            "CHEST": false,
            "ANVIL": false,
            "SPAWN_EGG": false,
            "LEVER": false,
            "ENCHANTING_TABLE": false,
            "HURT_MOB": false,
            "CAULDRON": false
        },
        "TRUCE": {
            "USE_ENTITY": false,
            "BREWING_STAND": false,
            "HURT_PLAYER": false,
            "BUTTON": false,
            "REPEATER": false,
            "ENDER_CHEST": false,
            "TRAPDOOR": false,
            "PLACE_BLOCK": false,
            "DISPENSER": false,
            "FILL_BUCKET": false,
            "BREAK_BLOCK": false,
            "DROPPER": false,
            "PRESSURE_PLATE": false,
            "LECTERN": false,
            "FENCE_GATE": false,
            "COMPARATOR": false,
            "EMPTY_BUCKET": false,
            "USE_BLACKLISTED_BLOCKS": false,
            "HOOK": false,
            "FURNACE": false,
            "HOPPER": false,
            "DOOR": false,
            "CHEST": false,
            "ANVIL": false,
            "SPAWN_EGG": false,
            "LEVER": false,
            "ENCHANTING_TABLE": false,
            "HURT_MOB": false,
            "CAULDRON": false
        },
        "ENEMY": {
            "USE_ENTITY": false,
            "BREWING_STAND": false,
            "HURT_PLAYER": false,
            "BUTTON": false,
            "REPEATER": false,
            "ENDER_CHEST": false,
            "TRAPDOOR": false,
            "PLACE_BLOCK": false,
            "DISPENSER": false,
            "FILL_BUCKET": false,
            "BREAK_BLOCK": false,
            "DROPPER": false,
            "PRESSURE_PLATE": false,
            "LECTERN": false,
            "FENCE_GATE": false,
            "COMPARATOR": false,
            "EMPTY_BUCKET": false,
            "USE_BLACKLISTED_BLOCKS": false,
            "HOOK": false,
            "FURNACE": false,
            "HOPPER": false,
            "DOOR": false,
            "CHEST": false,
            "ANVIL": false,
            "SPAWN_EGG": false,
            "LEVER": false,
            "ENCHANTING_TABLE": false,
            "HURT_MOB": false,
            "CAULDRON": false
        }
    }
}


const normalRole = {
  role: {
    chatTag: "-",
    roleTag: "Recruit",
    allowedPlayerActions: ["BREAK_BLOCK", "PLACE_BLOCK"],
    allowedMemberActions: [],
    specialActions: {},
    iconMaterial: "LEATHER_HELMET",
  },
};

const leaderRole = {
  chatTag: "***",
  roleTag: "Leader",
  allowedPlayerActions: [
    "HURT_MOB",
    "BUTTON",
    "LEVER",
    "PRESSURE_PLATE",
    "FENCE_GATE",
    "TRAPDOOR",
    "HOOK",
    "HOPPER",
    "LECTERN",
    "COMPARATOR",
    "REPEATER",
    "DISPENSER",
    "DOOR",
    "CHEST",
    "ENDER_CHEST",
    "ANVIL",
    "BREWING_STAND",
    "ENCHANTING_TABLE",
    "FURNACE",
    "DROPPER",
    "CAULDRON",
    "SPAWN_EGG",
    "BREAK_BLOCK",
    "PLACE_BLOCK",
    "EMPTY_BUCKET",
    "FILL_BUCKET",
    "USE_BLACKLISTED_BLOCKS",
    "USE_ENTITY",
  ],
  allowedMemberActions: [
    "KICK",
    "DISBAND",
    "INVITE",
    "DEINVITE",
    "DEMOTE",
    "PREFIX",
    "RENAME",
    "UNCLAIMALL",
    "CHANGE_DESCRIPTION",
    "FLY",
    "HOME",
    "SETHOME",
    "CLAIM",
    "UNCLAIM",
    "WARP",
    "SET_WARP",
    "DEL_WARP",
    "VIEW_WARP_PASSWORD",
    "RELATION",
    "OPEN",
    "PAYPAL_SET",
    "DISCORD_SET",
    "PROMOTE",
    "BANK_WITHDRAW",
    "BANK_DEPOSIT",
    "BANK_PAY",
    "BANK_LOGS",
  ],
  specialActions: {},
  iconMaterial: "DIAMOND_HELMET",
};
