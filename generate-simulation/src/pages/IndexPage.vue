<template>
  <q-page class="flex flex-top column">
    <div class="flex  flex-center">
      <img alt="Reduzz logo" src="~assets/logo.png" style="width: 150px; height: 150px">
      <p class="text-h2">Simule sua economia</p>
    </div>
    <div class="flex flex-center">
      <q-for style="width: 80%">
        <q-card>
          <q-card-section class="q-gutter-y-md">
            <div class="row q-gutter-x-md q-gutter-y-sm">
              <q-select dense label="Selecione originador que lhe indicou" option-label="label" option-value="value"
                class="col" outlined v-model="item" map-option emit-value :options=options />
            </div>
            <div class="row q-gutter-x-xs q-gutter-y-md">
              <q-input outlined v-model="info.nome" dense label="Nome completo" class="col" />
              <q-input outlined v-model="info.email" dense label="Email" class="col" />
              <q-input outlined v-model="info.telefone" dense label="Telefone" class="col" />
            </div>
            <q-separator color="black" class="q-mb-sm" />
            <div class="flex flex-center">
              <p class="text-bold text-h6 q-mb-none">Endereço</p>
            </div>
            <div class="row q-gutter-x-xs q-gutter-y-md q-mt-none q-mb-none">
              <q-input label="CEP" outlined rounded mask="#####-###" unmasked-value dense class="col "
                v-model="adress.adress.cep" @blur="ValidarCEP()" />
              <q-input label="Estado" outlined rounded v-if="invalidCep === false" :disable="!invalidCep" dense
                class="col" v-model="adress.adress.state" :rules="[requiredRule]" />
              <q-select v-model="adress.adress.state" :options="estados.optionsEstados" option-label="nome"
                option-value="nome" label="Estado" use-input input-debounce="0" @filter="filterFnEstadoPf" map-options
                outlined v-else emit-value dense class="col" :rules="[requiredRule]" />
              <q-input label="Cidade" outlined rounded class="col" dense v-if="!invalidCep" :disable="!invalidCep"
                v-model="adress.adress.city" :rules="[requiredRule]" />
              <q-select v-model="adress.adress.city" :options="optionsCity" use-input input-debounce="0"
                @filter="filterFnCidadePf" outlined label="Cidade" v-else dense class="col" :rules="[requiredRule]" />

            </div>
            <div class="row q-gutter-x-xs q-gutter-y-md q-mt-none q-mb-none">
              <q-input label="Bairro" outlined rounded class="col" dense v-model="adress.adress.bairro"
                :rules="[requiredRule]" />
              <q-input label="Endereço" outlined rounded dense class="col" v-model="adress.adress.adress"
                :rules="[requiredRule]" />
              <q-input label="numero" outlined rounded dense class="col" v-model="adress.adress.number"
                :rules="[requiredRule]" />
            </div>
            <div>
              <q-input label="complemento" outlined rounded dense class="col q-mb-md"
                v-model="adress.adress.complement" />
            </div>
            <q-separator color="black" class="q-mb-sm" />

            <div class="flex flex-center">
              <p class="text-bold text-h6 q-mb-none">Dados Da Empresa</p>
            </div>

            <div class="row q-gutter-x-xs q-gutter-y-md q-mt-none">
              <q-input outlined v-model="company.nome" dense label="Nome da empresa" class="col" />
              <q-input outlined v-model="company.email" dense label="Email da empresa" class="col" />
              <q-input outlined v-model="company.telefone" dense label="Telefone da empresa" class="col" />
              <q-input label="CNPJ" outlined rounded dense class="col q-mb-md" v-model="company.cnpj"
                mask="##.###.###/####-##" unmasked-value @blur="validarCnpj" />
            </div>
            <q-separator color="black" class="q-mb-sm" />
            <div class="flex flex-center">
              <p class="text-bold text-h6 q-mb-none">Dados de consumo</p>
            </div>
            <div>
              <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="row q-gutter-x-sm   q-mt-none q-mb-none">
                <div v-for="(item, ) in row" :key="item.mes" class="col q-mt-none q-mb-none">
                  <p class="flex flex-center">{{ item.mes }}</p>
                  <div class="column q-mt-none q-mb-none ">
                    <q-input outlined v-model="item.kw" dense :label="'Consumo de KW - ' + item.mes"
                      class="q-ma-none q-pa-none" />
                    <q-input outlined v-model="item.valor" dense :label="'Valor - ' + item.mes"
                      class="q-ma-none q-pa-none" />
                  </div>
                </div>
              </div>
            </div>



          </q-card-section>
        </q-card>
      </q-for>
    </div>
  </q-page>
</template>

<script lang=ts>

import { useQuasar } from 'quasar'
import { defineComponent, reactive, ref, computed } from 'vue'
import states from '../helpers/states'

export default defineComponent({
  name: 'IndexPage',

  setup() {

    const item = ref({})
    const $q = useQuasar()
    const info = ref({
      telefone: '',
      nome: '',
      email: ''
    })
    const listMonths = [
      'janeiro', 'fevereiro', 'março', 'abril',
      'maio', 'junho', 'julho', 'agosto',
      'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    const consumerItens = ref(listMonths.map(mes => ({
      mes: mes,
      kw: '',
      valor: ''
    })));
    const rows = computed(() => {
      const rows = [];
      const itemsPerRow = 4;
      for (let i = 0; i < consumerItens.value.length; i += itemsPerRow) {
        rows.push(consumerItens.value.slice(i, i + itemsPerRow));
      }
      return rows;
    });
    const company = ref({
      telefone: '',
      nome: '',
      email: '',
      cnpj: ''
    })
    const options = ref([
      { label: 'Roberto Oliveira', value: 'Roberto Oliveira' },
      { label: 'Lucas de almeida', value: 'Lucas de almeida' },
      { label: 'Doux Salem', value: 'Doux Salem' },
      { label: 'Leidy Olinto', value: 'Leidy Olinto' },
    ])
    var adress = reactive({

      clientAdress: {
        cep: '',
        adress: '',
        city: '',
        state: '',
        number: '',
        bairro: '',
        complement: '',
      },
    })
    const invalidCep = ref(false);
    const estados = ref({
      listaEstados: states,
      optionsEstados: [],

    });
    const optionsCity = ref([]);
    const ValidarCEP = () => {

      let cep = '';
      cep = adress.adress.cep.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

      // Link da documentação de onde foi retirado: https://viacep.com.br/
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (data.erro) {
            $q.notify({
              message:
                'Cep inválido, por favor insira o endereço manualmente PF',
              color: 'negative',
            });
            invalidCep.value = true;
          } else {

            adress.adress.adress = data.logradouro;
            adress.adress.city = data.localidade;
            adress.adress.state = data.uf;
            adress.adress.bairro = data.bairro;

          }
        })
        .catch((error) => {
          $q.notify({
            message: GetErrorMessage(error),
            color: 'posite',
          });
        });


    }

    const validarCnpj = () => {

      var cnpj = company.value.cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

      // Verifica se o CNPJ possui 14 dígitos
      if (cnpj.length !== 14) {
        $q.notify({
          message: 'Cnpj inválido',
          color: 'negative',
        });
        return false;
      }

      // Verifica se todos os dígitos são iguais, o que torna o CNPJ inválido
      if (/^(\d)\1+$/.test(cnpj)) {
        $q.notify({
          message: 'Cnpj inválido',
          color: 'negative',
        });
        return false;
      }

      // Calcula o primeiro dígito verificador
      let soma = 0;
      let peso = 2;
      for (let i = 11; i >= 0; i--) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = peso === 9 ? 2 : peso + 1;
      }
      let resto = soma % 11;
      let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

      // Verifica o primeiro dígito verificador
      if (parseInt(cnpj.charAt(12)) !== digitoVerificador1) {
        $q.notify({
          message: 'Cnpj inválido',
          color: 'negative',
        });
        return false;
      }

      // Calcula o segundo dígito verificador
      soma = 0;
      peso = 2;
      for (let i = 12; i >= 0; i--) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = peso === 9 ? 2 : peso + 1;
      }
      resto = soma % 11;
      let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

      // Verifica o segundo dígito verificador
      if (parseInt(cnpj.charAt(13)) !== digitoVerificador2) {
        $q.notify({
          message: 'Cnpj inválido',
          color: 'negative',
        });
        return false;
      }

      return true;

    };











    return {
      item,
      options,
      info,
      adress,
      ValidarCEP,
      invalidCep,
      estados,
      optionsCity,
      validarCnpj,
      company,
      consumerItens,
      rows

    }

  }

})

</script>
<style>
.q-field--outlined.q-field--rounded .q-field__control {
  border-radius: 9px !important;
}

.row {
  /* display: flex; */
  /* justify-content: space-between; */
  /* margin-bottom: 10px; */
}

/* .col {
  width: 23%;
} */
</style>
