const mix = {
  data() {
    return {
      oldPasswordtype: 'password',
      passwordtype: "password",
      passwordconfirmationtype: "password",

    };
  },
  methods: {
    changePassType() {
      if (this.passwordtype == "password") {
        this.passwordtype = "text";
      } else {
        this.passwordtype = "password";
      }
    },
    changePassConfirmationType() {
      if (this.passwordconfirmationtype == "password") {
        this.passwordconfirmationtype = "text";
      } else {
        this.passwordconfirmationtype = "password";
      }
    },
    changeOldPasswordType() {
      if (this.oldPasswordtype == "password") {
        this.oldPasswordtype = "text";
      } else {
        this.oldPasswordtype = "password";
      }
    },
  },
};

export default mix;
