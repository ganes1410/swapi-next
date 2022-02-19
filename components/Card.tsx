import { Box, BoxProps, Text, TextProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

interface ICard {
  children: React.ReactNode;
  to: string;
}

const MotionBox = motion<BoxProps>(Box);

function Card({ children, to }: ICard) {
  const router = useRouter();

  return (
    <MotionBox
      borderWidth={1}
      borderRadius={10}
      p={["4", "8"]}
      cursor="pointer"
      onClick={() => router.push(to)}
      whileHover={{
        translateY: -5,
        scale: 1.02,
      }}
    >
      {children}
    </MotionBox>
  );
}

export default Card;
