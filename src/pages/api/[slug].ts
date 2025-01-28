import { NextApiRequest, NextApiResponse } from "next";
import { getData } from "@/util/getData";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "No utility class was specified" });
  }

  const data = getData();

  const classData = data.filter(
    (item: { slug: string }) => item.slug === slug
  );

  if (classData.length === 0) {
    return res
      .status(404)
      .json({ error: `The '${slug}' utility was not found` });
  }

  res.status(200).json(classData);
};

export default handler;
