import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

// Placeholder loading file to remove the previous loading skeleton for this route
const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewIssuePage;
