<script>
import axios from "axios";

export default {
  async mounted() {
    await axios.post("http://localhost:8000/users/joinGroup",
        {
          groupID: this.$route.params.groupID,
          userID: this.$route.params.userID
        });
    this.$router.push("/")
  }
}
</script>