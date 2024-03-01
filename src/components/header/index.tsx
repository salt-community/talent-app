"use client";

import { isFeatureHeaderV2Enabled } from "@/feature-flags";
import { HeaderV1 } from "./header-v1";
import { HeaderV2 } from "./header-v2";

export const Header = () =>
  isFeatureHeaderV2Enabled() ? <HeaderV2 /> : <HeaderV1 />;
