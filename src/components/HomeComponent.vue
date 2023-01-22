<template>
  <q-page class="row q-mt-lg justify-evenly">
    <div class="column mkb">
      <div class="row input-div q-pa-sm mkb">
        <div class="q-ma-md cal-input mkb">
          <q-input outlined v-model="summonPoint" class="q-pa-none" type="number" label="뽑 sp" min="10" max="100000"
            step="10" :rules="[(val) => validateCost(val) || validationMsg]" style="height: 100%" />
        </div>
        <div class="q-ma-md cal-submit col-3 mkb">
          <q-btn @click="computeTotalSP(summonPoint)">
            계산하기
          </q-btn>
        </div>
      </div>
      <div class="q-ma-md q-pa-md result-div text-left text-body1 mkb">
        {{ totalSummPointText }}
      </div>
      <div class="row input-div q-pa-sm mkb">
        <div class="q-ma-md cal-input mkb">
          <q-input outlined v-model="waveNumber" class="q-pa-none" type="number" label="웨이브" min="1" max="100000"
            step="1" style="height: 100%" />
        </div>
        <div class="q-ma-md cal-submit col-3 mkb">
          <q-btn @click="computeTotalCards(waveNumber)">
            계산하기
          </q-btn>
        </div>
      </div>
      <div class="q-ma-md q-pa-md result-div text-left text-body1 mkb">
        {{ totalCardsText }}
      </div>
    </div>
  </q-page>

</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
const totalSummPoint: Ref<number> = ref(10);
const summonPoint: Ref<number> = ref(10);
const validationMsg = ref('');
const totalSummPointText = ref('');
const waveNumber = ref(0);
const totalCardsText = ref('');


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
  totalSummPointText.value = `뽑sp ${summP}의 총 sp 량은 ${totalSummPoint.value}장`;
};

const computeTotalCards = (waves: number) => {
  let totalCards = 0;
  if (waves <= 45) {
    while (waves > 5) {
      waves -= 5;
      totalCards += 8;
    }
    totalCards += waves;
    if (waves >= 3) totalCards++;
  } else {
    waves -= 45;
    totalCards += 72;
    if (waves % 2 == 1) {
      waves--;
      totalCards += 2;
    }
    totalCards += (waves / 2) * 8;
  }
  totalCardsText.value = `${waveNumber.value}웨이브 총 카드 획득량은 ${totalCards}`;
}
</script>

<style lang="scss">
.input-div {
  width: 800px;
  height: 80px;

  .cal-input {
    width: 300px;
  }

  .cal-submit {
    button {
      height: 56px;
    }
  }
}

.result-div {
  width: 800px;
}

.mkb {
  // border: solid 1px red !important;
}
</style>
