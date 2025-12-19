/**
 * Timepicker Wrapper
 *
 * Wrapper to handle timepicker-ui-react import issues with Next.js webpack.
 * Uses require to bypass strict exports field during build.
 */

import type React from "react";

// Use require to bypass strict exports field check
// eslint-disable-next-line @typescript-eslint/no-require-imports
const timepickerModule = require("timepicker-ui-react") as {
  Timepicker: React.ForwardRefExoticComponent<
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "ref" | "value" | "defaultValue" | "onError"
    > & {
      options?: {
        clock?: {
          type?: "12h" | "24h";
          autoSwitchToMinutes?: boolean;
        };
        ui?: {
          theme?: string;
          mobile?: boolean;
          cssClass?: string;
        };
        callbacks?: {
          onConfirm?: (data: { hour: number; minutes: number }) => void;
          onCancel?: () => void;
          onOpen?: () => void;
          onUpdate?: (data: { hour: number; minutes: number }) => void;
          onSelectHour?: (data: { hour: number }) => void;
          onSelectMinute?: (data: { minutes: number }) => void;
          onSelectAM?: () => void;
          onSelectPM?: () => void;
          onError?: (error: Error) => void;
        };
      };
      value?: string;
      defaultValue?: string;
      onConfirm?: (data: { hour: number; minutes: number }) => void;
      onCancel?: () => void;
      onOpen?: () => void;
      onUpdate?: (data: { hour: number; minutes: number }) => void;
      onSelectHour?: (data: { hour: number }) => void;
      onSelectMinute?: (data: { minutes: number }) => void;
      onSelectAM?: () => void;
      onSelectPM?: () => void;
      onError?: (error: Error) => void;
    } & React.RefAttributes<HTMLInputElement>
  >;
};

export const Timepicker = timepickerModule.Timepicker;
