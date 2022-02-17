const prisma = require("../lib/pisma");

module.exports = {
  createSwell: async (req, res) => {
    console.log(req.body);
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.user.email,
        },
      });

      const location = await prisma.location.upsert({
        where: {
          name: spot.name,
        },
        create: {
          spot_id: _id,
          name: spot.name,
          lat: spot.lat,
          lon: spot.lon,
          timezone: spot.timezone,
          thumbnail: spot.thumbnail,
          type: spot.location.type,
          subregionId: spot.subregionId,
          user: {
            connect: {
              email: req.body.user.email,
            },
          },
          session: {
            create: {
              timeStamp: spot.tide.current.timestamp,
              timeZone: spot.timezone,
              utcOffset: spot.tide.current.utcOffset,
              surfMax: spot.waveHeight.max,
              surfMin: spot.waveHeight.min,
              userEmail: user.email,
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
          spot_id: _id,
          name: spot.name,
          lat: spot.lat,
          lon: spot.lon,
          timezone: spot.timezone,
          thumbnail: spot.thumbnail,
          type: spot.location.type,
          subregionId: spot.subregionId,
          user: {
            connect: {
              email: req.body.user.email,
            },
          },
          session: {
            create: {
              timeStamp: spot.tide.current.timestamp,
              timeZone: spot.timezone,
              utcOffset: spot.tide.current.utcOffset,
              surfMax: spot.waveHeight.max,
              surfMin: spot.waveHeight.min,
              userEmail: user.email,
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
      res.status(400).send(error);
      console.log(err);
    }
  },
};
