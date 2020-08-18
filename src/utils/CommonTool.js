
export default function showDXMessage(response) {
  if (response.status === 200) {
    console.log('rrrrrrrrr');
    // this.$notify({
    //   title: '成功',
    //   message: response.message,
    //   type: 'success',
    //   duration: 2000
    // });
    return true;
  } else {
    // this.$notify({
    //   title: '失败',
    //   message: response.message,
    //   type: 'error',
    //   duration: 2000
    // });
    return false;
  }
}

