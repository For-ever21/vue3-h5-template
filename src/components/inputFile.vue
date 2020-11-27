<template>
  <input type="file" ref="inputNode" @change="changeImage($event)" :accept="accept" />
</template>
<script>
  import { defineComponent, reactive } from "@utils/Vuewrap";
  export default defineComponent({
    name: "inputFile",
    props: {
      acceptFormat: {
        type: String,
        default: function () {
          return "image/*";
        },
      },
      maxSize: {
        type: Number,
        default: 0,
      },
      outputFormat: {
        type: String,
        default: "",
      },
    },
    watch: {
      acceptFormat: {
        handler() {
          this.accept = this.acceptFormat;
        },
        immediate: true,
      },
    },
    setup() {
      const data = reactive({
        base64: "",
        accept: "",
      });
      return data;
    },
    methods: {
      select() {
        this.$refs.inputNode.click();
      },
      clear() {
        this.$refs.inputNode.value = null;
      },
      changeImage(event) {
        let file = event.target.files[0];
        this.file = file;
        if (this.maxSize) {
          let isLt8M = file.size / 1024 / 1024 < this.maxSize;
          if (!isLt8M) {
            this.$message.error(`上传的图片大小不能超过 ${this.maxSize}MB!`);
            return false;
          }
        }
        if (this.outputFormat == "arraybuffer") {
          this.readAsArrayBuffer(function (data) {
            this.$emit("change", {
              data: data,
              arraybuffer: data,
            });
          }, this);
        } else {
          this.readAsDataURL(function (data) {
            this.$emit("change", {
              data: data,
              base64: data,
            });
          }, this);
        }
      },
      readAsDataURL(callBack, context) {
        if (this.file) {
          let reader = new FileReader();
          reader.onload = function (e) {
            let data = e.target.result;
            callBack && callBack.call(context, data);
          };
          reader.readAsDataURL(this.file);
        }
      },
      getBlobData() {
        return this.file;
      },
      readAsArrayBuffer(callBack, context) {
        if (this.file) {
          let reader = new FileReader();
          reader.onload = function (e) {
            let data = e.target.result;
            callBack && callBack.call(context, data);
          };
          reader.readAsArrayBuffer(this.file);
        }
      },
    },
  });
</script>
<style lang="less" scoped></style>
