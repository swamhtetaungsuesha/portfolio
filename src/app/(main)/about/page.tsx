import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiFramer,
  SiAdobexd,
  SiAdobephotoshop,
} from "react-icons/si";
import ProjectsBtn from "../../../components/ProjectsBtn";
import { fadeIn } from "@/utils/variants";
import Circles from "../../../components/Circles";
// import BurnCircle from "../../components/";
import Bulb from "../../../components/Bulb";
import TopRightImg from "../../../components/TopRightImg";
import { getTableColumns } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import AboutView from "@/views/about/AboutView";

const Page = async () => {
  const { createdAt, updatedAt, ...rest } = getTableColumns(users);
  const result = await db
    .select({ ...rest })
    .from(users)
    .limit(1);
  return <AboutView user={result[0]} />;
};

export default Page;
