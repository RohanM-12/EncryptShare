const { prisma } = require("../utils/DBConnect");

const getFileLogs = async (req, res) => {
  try {
    const { fileId } = req.query;
    const logData = await prisma.fileAccessLog.findMany({
      where: {
        fileId: parseInt(fileId),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        timeStamp: "desc",
      },
      take: 10,
    });

    const formattedLogData = logData.map((log) => {
      const { ipAddr, ...rest } = log;
      return rest;
    });

    return res.status(200).json({
      message: "success",
      data: formattedLogData,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getFileLogs,
};
