const prisma = require("../lib/pisma");
const flatten = require("../lib/flatten");

module.exports = {
  findAllSessions: async function (req, res) {
    const { email } = req.params;
    try {
      const session = await prisma.session.findMany({
        where: {
          userEmail: email,
        },
        select: {
          spot: true,
        },
      });

      const data = await flatten(session);

      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findSession: async function (req, res) {
    const { id } = req.params;
    try {
      const session = await prisma.session.findUnique({
        where: {
          id: id,
        },
      });

      res.status(200).send(session);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findSessionsOnLocation: async function (req, res) {
    const { id } = req.params;
    try {
      const session = await prisma.session.findMany({
        where: {
          spotId: id,
        },
      });
      res.status(200).send(session);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  deleteSession: async function (req, res) {
    const { id } = req.params.id;
    try {
      const session = await prisma.session.delete({
        where: {
          id: id,
        },
      });

      res.status(200).send(session);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  deleteSessionsFromLocation: async function (req, res) {
    const { id } = req.body;
    console.log(id);
    try {
      const session = await prisma.session.deleteMany({
        where: {
          spotId: id,
        },
      });
      console.log(session);
      res.status(200).send(session);
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  },

  createSwell: async function (req, res) {
    const { spot } = req.body;
    const { account } = req.body;

    try {
      const user = await prisma.user.upsert({
        where: {
          email: account.email,
        },
        create: {
          name: account.nickname,
          email: account.email,
        },
        update: {
          name: account.nickname,
          email: account.email,
        },
      });

      const location = await prisma.location.upsert({
        where: {
          name: spot.name,
        },
        create: {
          spot_id: spot._id,
          name: spot.name,
          lat: spot.lat,
          lon: spot.lon,
          timezone: spot.timezone,
          thumbnail: spot.thumbnail,
          type: spot.location.type,
          subregionId: spot.subregionId,
          user: {
            connect: {
              email: account.email,
            },
          },
          session: {
            create: {
              timeStamp: spot.tide.current.timestamp,
              timeZone: spot.timezone,
              utcOffset: spot.tide.current.utcOffset,
              surfMax: spot.waveHeight.max,
              surfMin: spot.waveHeight.min,
              occasional: spot.waveHeight.occasional,
              userEmail: account.email,
              waterTemp: `${spot.waterTemp.min} - ${spot.waterTemp.max}`,
              conditions: {
                human: spot.conditions.human,
                value: spot.conditions.value,
                sortableCondition: spot.conditions.sortableCondition,
              },
              tide: {
                type: spot.tide.current.type,
                height: spot.tide.current.height,
                timestamp: spot.tide.timestamp,
                nextType: spot.tide.next.type,
                nextTime: spot.tide.next.timestamp,
                nextHeight: spot.tide.next.height,
              },
              wind: {
                speed: spot.wind.speed,
                direction: spot.wind.direction,
                directionType: spot.wind.directionType,
              },
              // eslint-disable-next-line no-debugger
              swells: [...spot.swells],
            },
          },
        },
        update: {
          spot_id: spot._id,
          name: spot.name,
          lat: spot.lat,
          lon: spot.lon,
          timezone: spot.timezone,
          thumbnail: spot.thumbnail,
          type: spot.location.type,
          subregionId: spot.subregionId,
          user: {
            connect: {
              email: account.email,
            },
          },
          session: {
            create: {
              timeStamp: spot.tide.current.timestamp,
              timeZone: spot.timezone,
              utcOffset: spot.tide.current.utcOffset,
              surfMax: spot.waveHeight.max,
              surfMin: spot.waveHeight.min,
              userEmail: account.email,
              waterTemp: `${spot.waterTemp.min} - ${spot.waterTemp.max}`,
              conditions: {
                human: spot.conditions.human,
                value: spot.conditions.value,
                sortableCondition: spot.conditions.sortableCondition,
              },
              tide: {
                type: spot.tide.current.type,
                height: spot.tide.current.height,
                timestamp: spot.tide.timestamp,
                nextType: spot.tide.next.type,
                nextTime: spot.tide.next.timestamp,
                nextHeight: spot.tide.next.height,
              },
              wind: {
                speed: spot.wind.speed,
                direction: spot.wind.direction,
                directionType: spot.wind.directionType,
              },
              // eslint-disable-next-line no-debugger
              swells: [...spot.swells],
            },
          },
        },
        include: {
          session: true,
          user: true,
        },
      });

      res.status(200).send(location);
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  },
};
