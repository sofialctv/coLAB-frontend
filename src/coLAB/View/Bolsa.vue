<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { IBolsa } from 'coLab/Models/Entities/Bolsa';
import BolsaRepository from 'coLAB/Controller/BolsaRepository';

// Definindo cabeçalho da tabela com as colunas
const header = ref([
  { title: 'Id', key: 'Id' },
  { title: 'Valor', key: 'Valor' },
  { title: 'Data Início', key: 'DataInicio' },
  { title: 'Data Fim', key: 'DataFim' },
  { title: 'Ativo', key: 'Ativo' },
  { title: 'Tipo Bolsa', key: 'TipoBolsa' },
  { title: 'Ações', key: 'actions' }
]);

const showModal = ref(false); // Para controlar a exibição do modal
const isEditing = ref(false); // Para controlar se estamos em modo de edição

// Instância de nova bolsa (para criar ou editar)
const newBolsa = ref<IBolsa>({
  Id: 0,
  Valor: 0,
  DataInicio: new Date(),
  DataFim: new Date(),
  DataPrevistaFim: new Date(),
  Ativo: true,
  TipoBolsa: { Id: 0, Nome: '' }, // Assumindo que TipoBolsa é um objeto
  Pessoa: { Id: '', Nome: '' }    // Assumindo que Pessoa é um objeto
});

// Funções CRUD
const bolsaRepository = new BolsaRepository();

// Função para buscar todas as bolsas
async function getBolsas() {
  try {
    await bolsaRepository.fetchAllBolsa();
  } catch (error) {
    console.error('Erro ao buscar bolsas:', error);
  }
}

// Função para editar uma bolsa
function editBolsa(item: IBolsa) {
  newBolsa.value = { ...item }; // Preenche o formulário com os dados da bolsa
  isEditing.value = true;
  showModal.value = true; // Abre o modal
}

// Função para deletar uma bolsa
async function deleteBolsa(item: IBolsa) {
  try {
    await bolsaRepository.deleteBolsa(item.Id);
    await getBolsas(); // Atualiza a lista após a exclusão
  } catch (error) {
    console.error('Erro ao excluir bolsa:', error);
  }
}

// Filtro (para pesquisa na página, não na base de dados)
const filtro = ref('');
function buscar(valor: string) {
  filtro.value = valor.toLowerCase();
}

// Computed para filtrar os itens com base no valor de filtro
const filteredItems = computed(() => {
  return bolsaRepository.items.filter(x => x.TipoBolsa.Nome.toLowerCase().includes(filtro.value));
});

// Fetch inicial
onMounted(async () => {
  await getBolsas(); // Chama o método para buscar as bolsas
});
</script>
