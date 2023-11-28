import { CircularProgress } from "@material-ui/core";

export const Loading = () => {
    return (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      );
};