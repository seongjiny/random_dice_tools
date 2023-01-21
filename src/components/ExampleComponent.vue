<template>
  <div class="column mkb">
    <div class="row input-div q-pa-sm mkb">
      <div class="q-mx-sm col-8 mkb">
        <q-input
          outlined
          v-model="summonPoint"
          class="q-pa-none"
          type="number"
          label="뽑 sp"
          min="10"
          max="100000"
          step="10"
          :rules="[(val) => validateCost(val) || validationMsg]"
          style="height: 100%"
        />
      </div>
      <div class="q-mx-sm col-3 mkb">
        <q-btn @click="computeTotalSP(summonPoint)" style="height: 100%">
          계산하기
        </q-btn>
      </div>
    </div>
    <div class="q-pa-none result-div text-center text-body1 mkb">
      {{ resultText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
const totalSummPoint: Ref<number> = ref(10);
const summonPoint: Ref<number> = ref(0);
const validationMsg = ref('');
const resultText = ref('');

const validateCost = (val: number) => {
  if (val < 10) {
    validationMsg.value = '뽑sp는 10 이상이어야 합니다.';
    return false;
  } else if (val > 1000000) {
    validationMsg.value = '뽑sp는 100만 이하여야 합니다. (어차피 못하잖아)';
    return false;
  } else if (val % 10 != 0) {
    validationMsg.value = '뽑sp는 10의 제곱어야 합니다.';
    return false;
  }

  return true;
};

const computeTotalSP = (summP: number) => {
  let cur: number = summP - 10;
  totalSummPoint.value = 0;
  while (cur > 0) {
    totalSummPoint.value += +cur;
    cur -= 10;
  }
  resultText.value = `뽑sp ${summP}의 총 sp 량은 ${totalSummPoint.value}`;
};
</script>

<style lang="scss">
.input-div {
  width: 800px;
  height: 80px;
}
.result-div {
  width: 800px;
}

.mkb {
  border: solid 1px red !important;
}
</style>
