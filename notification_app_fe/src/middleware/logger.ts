import axios from "axios";

type StackType = "frontend" | "backend";

type LevelType =
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "fatal";

type FrontendPackageType =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils";

const Log = async (
  stack: StackType,
  level: LevelType,
  packageName: FrontendPackageType,
  message: string
) => {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Log created:", response.data);
  } catch (error) {
    console.error("Logging failed:", error);
  }
};

export default Log;