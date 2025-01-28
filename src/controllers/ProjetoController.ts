import { getProjectData } from '../models/Projeto';

export const fetchProject = async () => {
  try {
    const data = await getProjectData();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do projeto:', error);
  }
};
