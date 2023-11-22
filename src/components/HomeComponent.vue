<script setup lang="ts">
import { Ref, ref } from 'vue';
// import { useQuasar } from 'quasar';

// const $q = useQuasar();
const totalSummPoint: Ref<number> = ref(10);
const summonPoint: Ref<number> = ref(10);
const validationMsgSP = ref('');
const validationMsgWaves = ref('');
const totalSummPointText = ref('');
const waveNumber = ref(0);
const soulClass = ref(7);
const soulStack = ref(0);
const criticalDmg = ref(113);
const totalSoulDmg = ref<number>(0);
const totalCardsText = ref('');
const totalCardsText2 = ref('');

const validateCost = (val: number) => {
  if (val < 10) {
    validationMsgSP.value = '뽑sp는 10 이상이어야 합니다.';
    return false;
  } else if (val > 100000) {
    validationMsgSP.value =
      '최대 웨이브는 10만 입니다. (어차피 핵 아니면 못함)';
    return false;
  }

  return true;
};

const validateWaves = (val: number) => {
  if (val < 0) {
    validationMsgWaves.value = '웨이브는 자연수이어야 합니다.';
    return false;
  } else if (val > 1000000) {
    validationMsgWaves.value =
      '웨이브는 100만 이하여야 합니다. (어차피 못하잖아)';
    return false;
  }

  return true;
};

// const validateClass = (val: number) => {
//   if (val < 7 && val > 15) {
//     $q.notify({
//       message: '전설 클래스는 7부터 15까지만 가능합니다',
//       type: 'negative',
//       timeout: 3000,
//     });
//     return false;
//   }

//   return true;
// };

const computeTotalSP = (summP: number) => {
  let cur: number = summP - 10;
  totalSummPoint.value = 0;
  while (cur > 0) {
    totalSummPoint.value += +cur;
    cur -= 10;
  }
  totalSummPointText.value = `뽑sp ${summP}의 총 sp 량은 ${totalSummPoint.value}`;
};

const computeTotalCards = (waves: number) => {
  let totalCards = 0;
  if (waves <= 45) {
    while (waves >= 5) {
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
  totalCardsText.value = `${waveNumber.value} 웨이브 총 카드 획득량은 ${totalCards}장`;
  totalCardsText2.value = `\t도전모드 총 카드 획득량은 ${Math.round(
    totalCards * 1.5
  )}장`;
};

const updateSoulValues = () => {
  totalSoulDmg.value =
    (140 + 20 * (soulClass.value - 7)) * soulStack.value + 30;
};
</script>

<template>
  <q-page class="row q-mt-lg">
    <div class="column mkb">
      <div class="row input-div q-pa-sm mkb">
        <div class="q-ma-md cal-input mkb">
          <q-input
            outlined
            v-model="summonPoint"
            class="q-pa-none"
            type="number"
            label="뽑 sp"
            min="10"
            max="1000000"
            step="10"
            :rules="[(val) => validateCost(val) || validationMsgSP]"
            style="height: 100%"
          />
        </div>
        <div class="q-ma-md cal-submit col-3 mkb">
          <q-btn @click="computeTotalSP(summonPoint)"> 계산하기 </q-btn>
        </div>
      </div>
      <div class="q-ma-md q-pa-md result-div text-left text-body1 mkb">
        {{ totalSummPointText }}
      </div>
      <q-separator />
      <div class="row input-div q-pa-sm mkb">
        <div class="q-ma-md cal-input mkb">
          <q-input
            outlined
            v-model="waveNumber"
            class="q-pa-none"
            type="number"
            label="웨이브"
            min="1"
            max="100000"
            step="1"
            :rules="[(val) => validateWaves(val) || validationMsgWaves]"
            style="height: 100%"
          />
        </div>
        <div class="q-ma-md cal-submit col-3 mkb">
          <q-btn @click="computeTotalCards(waveNumber)"> 계산하기 </q-btn>
        </div>
      </div>
      <div class="q-ma-md q-pa-md result-div text-left text-body1 mkb">
        {{ totalCardsText }} <br />
        {{ totalCardsText2 }}
      </div>
      <q-separator />
      <div class="input-div q-pa-sm mkb">
        <div class="q-ma-md cal-input2 row">
          <q-input
            outlined
            v-model="soulClass"
            class="col-4 q-mr-sm"
            type="number"
            label="영혼 클래스"
            min="7"
            max="15"
            step="1"
            @change="updateSoulValues"
          />
          <q-input
            outlined
            v-model="criticalDmg"
            class="col"
            type="number"
            label="크리티컬 데미지"
            min="113"
            max="4000"
            step="1"
            @change="updateSoulValues"
          />
        </div>
        <div class="q-ma-md cal-input2 row">
          <q-input
            outlined
            style="width: 350px"
            v-model="soulStack"
            class="q-pa-none"
            type="number"
            label="영혼 스택"
            min="1"
            max="1000000"
            step="1"
            @change="updateSoulValues"
          />
        </div>
      </div>
      <div class="q-ma-md q-pa-md result-div text-left text-body1">
        <div class="row">
          <div class="col-2">총 영혼 데미지</div>
          :
          <div class="q-ml-sm col">
            {{ Math.round(totalSoulDmg).toLocaleString() }}
          </div>
        </div>
        <div class="row">
          <div class="col-2">크리티컬 포함</div>
          :
          <div class="q-ml-sm col">
            {{
              Math.round((totalSoulDmg * criticalDmg) / 100).toLocaleString()
            }}
          </div>
        </div>
        <div class="row">
          <div class="col-2">달 추가 데미지</div>
          :
          <div class="q-ml-sm col">
            {{ Math.round(totalSoulDmg * 1.7).toLocaleString() }}
          </div>
        </div>
        <div class="row">
          <div class="col-2">달,크리티컬 포함</div>
          :
          <div class="q-ml-sm col">
            {{
              Math.round(
                (totalSoulDmg * criticalDmg * 1.7) / 100
              ).toLocaleString()
            }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss">
.input-div {
  width: 800px;
  .cal-input {
    width: 200px;
  }
  .cal-input2 {
    width: 300px;
  }

  .cal-submit {
    width: 350px;
    button {
      height: 56px;
    }
  }
}

.result-div {
  width: 800px;
}

img {
  width: 50px;
  height: 50px;
}
</style>
