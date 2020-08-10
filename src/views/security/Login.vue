<template>
  <div class="loginPage">
    <div class="layout-wrapper layout-overlay">
      <div class="layout-main">
        <form @submit.prevent="login">
          <div class="p-grid">
            <div class="p-col-12">
              <div class="card p-shadow-6">
                <h2 class="p-pb-3">Login</h2>

                <div class="p-field p-fluid">
                  <div class="p-field p-py-2">
                    <span class="p-float-label">
                      <InputText
                        type="text"
                        v-model="username"
                        required="true"
                        autofocus
                        :class="{'p-invalid': submitted && !username}"
                      />
                      <label for="username">Username</label>
                      <small class="p-invalid" v-if="submitted && !username">Username is required.</small>
                    </span>
                  </div>
                  <div class="p-field p-py-2">
                    <span class="p-float-label">
                      <InputText
                        type="password"
                        v-model="password"
                        required="true"
                        :class="{'p-invalid': submitted && !password}"
                      />
                      <label for="password">Password</label>
                      <small class="p-invalid" v-if="submitted && !password">Password is required.</small>
                    </span>
                  </div>
                </div>
                <div class="p-grid">
                  <Button
                    icon="pi pi-sign-in"
                    label="Login"
                    @click="btnLogin"
                    class="p-d-block p-m-2"
                  />
                  <router-link to="/Register" class="p-d-block p-m-3">Register</router-link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      isSinglePage: true,
    };
  },
  methods: {
    login() {
      //write login authencation logic here!
      if (this.username == "abcd" && this.password == "1234") {
        localStorage.setItem("token", "ImLogin");
        this.$router.push("/");
      } else {
        alert("login failed");
      }
    },
    btnLogin() {
      this.submitted = true;
    },
  },
};
</script>