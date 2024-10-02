import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import AccountBoxIcon from "@mui/icons-material/AccountBox";

export default function IconAvatars() {
  return (
    <Stack direction='row' spacing={2}>
      <Avatar>
        <AccountBoxIcon />
      </Avatar>
    </Stack>
  );
}
