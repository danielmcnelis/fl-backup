$((function(){$("#showPassword").on("click",(function(){let s=$("#password").attr("type"),t="password"===s?"text":"password";$("#password").attr("type",t),s=$("#newpassword").attr("type"),t="password"===s?"text":"password",$("#newpassword").attr("type",t),s=$("#confirmpassword").attr("type"),t="password"===s?"text":"password",$("#confirmpassword").attr("type",t)}))}));