"use client";

import { isFeatureHeaderV2Enabled } from "@/feature-flags";
import { HeaderV1 } from "./header-v1";
import { HeaderV2 } from "./header-v2";
import { useSession } from "next-auth/react";

export const Header = () => {
  const session = useSession();
  return isFeatureHeaderV2Enabled(session) ? <HeaderV2 /> : <HeaderV1 />;
};
