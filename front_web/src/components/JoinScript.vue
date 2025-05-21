<script>
import * as postRequest from "@/js/postRequest";

export default {
  async mounted() {
    await postRequest.requestUser("/joinGroup", {
      groupID: this.$route.params.groupID,
      userID: this.$route.params.userID
    });

    // await axios.post("http://localhost:8000/users/joinGroup",
    //     {
    //       groupID: this.$route.params.groupID,
    //       userID: this.$route.params.userID
    //     });
    this.$router.push("/")
  }
}
</script>