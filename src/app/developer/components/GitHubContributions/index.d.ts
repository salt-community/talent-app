import type { FunctionComponent } from "react";
import type {
  Activity,
  Props as ActivityCalendarProps,
} from "react-activity-calendar";

export interface Props extends Omit<ActivityCalendarProps, "data"> {
  username: string;
  year?: number | "last";
  transformData?: (data: Array<Activity>) => Array<Activity>;
  transformTotalCount?: boolean;
}

declare const GitHubCalendar: FunctionComponent<Props>;

export default GitHubCalendar;
