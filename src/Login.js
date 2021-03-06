import React, { Component } from "react";
import { observer } from "mobx-react";
import theme from "./theme";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LoginStore from "./stores/Login.store";
import UserStore from "./stores/User.store";



class Login extends Component {
  render() {
    return (
      <Box style={{ width: "100%", textAlign: "center" }}>
        <Box style={{ marginTop: 100, fontSize: 40, color: theme.primary }}>
          eWallet
        </Box>
        <Box style={{ marginTop: 50 }}>
          <TextField
            placeholder="username"
            size="small"
            variant="outlined"
            onChange={(e) => LoginStore.setUsername(e.target.value)}
          />
        </Box>
        <Box style={{ marginTop: 10 }}>
          <TextField
            placeholder="password"
            size="small"
            variant="outlined"
            type="password"
            onChange={(e) => LoginStore.setPassword(e.target.value)}
          />
        </Box>
        <Box style={{ marginTop: 20 }}>
          <Button
            style={{
              backgroundColor: theme.primary,
              color: theme.textSecondaryLight
            }}
            onClick={async () => {
              const password = LoginStore.getPassword();
              if (password && password === "pass") {
                const username = LoginStore.getUsername();
                UserStore.setUsername(username);
                const user = await UserStore.fetchUser();
                UserStore.setUser(user);
                LoginStore.setUser(user)
                const userAccessToken = LoginStore.fetchUserAccessToken();
                LoginStore.setUserAccessToken(userAccessToken);
                window.location.assign(`/user/${username}/wallet`);
              }
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    );
  }
}

export default observer(Login);
