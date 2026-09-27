export type DocumentStatus = 'Pronto' | 'Em revisão' | 'Rascunho';

export type SecureDocument = {
  id: string;
  title: string;
  template: string;
  category: string;
  status: DocumentStatus;
  updatedAt: string;
  progress: number;
  content: string;
  checklist: string[];
  answers?: Record<string, string>;
};

export const templates = [
  {
    id: 'politica-privacidade',
    title: 'Política de Privacidade',
    description: 'Explique como sua empresa trata dados pessoais no dia a dia.',
    category: 'Privacidade',
    time: '8 min',
    icon: 'ShieldCheck',
  },
  {
    id: 'plano-incidentes',
    title: 'Plano de resposta a incidentes',
    description: 'Saiba o que fazer, quem avisar e como registrar um incidente.',
    category: 'Segurança',
    time: '10 min',
    icon: 'Siren',
  },
  {
    id: 'inventario-dados',
    title: 'Inventário de dados pessoais',
    description: 'Mapeie os dados que sua empresa coleta, usa e compartilha.',
    category: 'Organização',
    time: '6 min',
    icon: 'ClipboardList',
  },
  {
    id: 'termos-uso',
    title: 'Termos de uso do site',
    description: 'Defina regras claras para quem utiliza seus canais digitais.',
    category: 'Privacidade',
    time: '7 min',
    icon: 'FileText',
  },
];

const seedDocuments: SecureDocument[] = [
  {
    id: 'doc-privacidade',
    title: 'Política de Privacidade — Dobra Studio',
    template: 'Política de Privacidade',
    category: 'Privacidade',
    status: 'Pronto',
    updatedAt: 'Hoje, 09:42',
    progress: 100,
    content: `POLÍTICA DE PRIVACIDADE\n\nÚltima atualização: 21 de junho de 2024\n\n1. Como cuidamos dos seus dados\nA Dobra Studio valoriza a privacidade de clientes, parceiros e visitantes. Este documento explica, de forma simples, quais dados coletamos, por que usamos e como protegemos essas informações.\n\n2. Dados que podemos coletar\nColetamos nome, e-mail, telefone e informações necessárias para prestar nossos serviços. Também registramos dados de navegação de forma limitada para manter o site seguro e melhorar a experiência.\n\n3. Seus direitos\nVocê pode solicitar acesso, correção ou exclusão dos seus dados entrando em contato com nossa equipe. Responderemos dentro do prazo aplicável.\n\n4. Segurança\nAdotamos controles de acesso, cópias de segurança e treinamento da equipe para reduzir riscos de acesso indevido.`,
    checklist: ['Identificar o controlador', 'Listar dados coletados', 'Descrever direitos do titular', 'Definir canal de contato'],
  },
  {
    id: 'doc-incidentes',
    title: 'Plano de resposta a incidentes',
    template: 'Plano de resposta a incidentes',
    category: 'Segurança',
    status: 'Em revisão',
    updatedAt: 'Ontem, 16:18',
    progress: 72,
    content: `PLANO DE RESPOSTA A INCIDENTES\n\nObjetivo\nReduzir o impacto de eventos de segurança e organizar uma resposta rápida, documentada e proporcional ao risco.\n\n1. Identificação\nAo perceber um comportamento incomum, registre data, horário, sistemas envolvidos e evidências disponíveis. Não apague arquivos ou reinicie máquinas sem orientação.\n\n2. Contenção\nIsole o acesso afetado, preserve os registros e comunique a pessoa responsável pela segurança da informação.\n\n3. Comunicação e recuperação\nAvalie o impacto, comunique as pessoas necessárias e só retome a operação após validar os controles.`,
    checklist: ['Definir responsável', 'Criar canal de comunicação', 'Documentar evidências', 'Testar o plano'],
  },
  {
    id: 'doc-inventario',
    title: 'Inventário de dados — atendimento',
    template: 'Inventário de dados pessoais',
    category: 'Organização',
    status: 'Rascunho',
    updatedAt: '18 jun 2024',
    progress: 38,
    content: `INVENTÁRIO DE DADOS PESSOAIS\n\nÁrea: Atendimento\n\nUse este documento para registrar quais dados entram na operação, onde ficam, quem acessa e quando devem ser apagados.\n\nRegistro inicial\nAinda faltam informações sobre sistemas, prazos de retenção e compartilhamentos.`,
    checklist: ['Listar origem dos dados', 'Registrar sistemas', 'Definir retenção', 'Revisar acessos'],
  },
];

const storageKey = 'securedocs-documents-v1';
const themeKey = 'securedocs-theme';

export function readDocuments(): SecureDocument[] {
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : seedDocuments;
  } catch {
    return seedDocuments;
  }
}

export function writeDocuments(documents: SecureDocument[]) {
  localStorage.setItem(storageKey, JSON.stringify(documents));
  window.dispatchEvent(new CustomEvent('securedocs-documents'));
}

export function getTheme() {
  return localStorage.getItem(themeKey) || 'light';
}

export function setTheme(theme: string) {
  localStorage.setItem(themeKey, theme);
  window.dispatchEvent(new CustomEvent('securedocs-theme'));
}

export function formatDate() {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(new Date())
    .replace('.', '');
}

export function makeDocument(templateId: string, answers: Record<string, string>): SecureDocument {
  const template = templates.find((item) => item.id === templateId) || templates[0];
  const company = answers.company || 'minha empresa';
  const contact = answers.contact || 'um canal de atendimento';
  const focus = answers.focus || 'os dados necessários para a operação';
  return {
    id: `doc-${Date.now()}`,
    title: `${template.title} — ${company}`,
    template: template.title,
    category: template.category,
    status: 'Em revisão',
    updatedAt: 'Agora mesmo',
    progress: 66,
    answers,
    checklist: ['Confirmar informações da empresa', 'Revisar responsabilidades', 'Aprovar e compartilhar'],
    content: `${template.title.toUpperCase()}\n\nÚltima atualização: ${formatDate()}\n\nContexto da empresa\nEste documento foi preparado para ${company}, com base nas respostas fornecidas no diagnóstico guiado.\n\nComo a operação funciona\nA empresa trabalha com ${focus}. Os acessos e responsabilidades devem ser revistos periodicamente para manter as informações protegidas e a equipe alinhada.\n\nOrientações práticas\nUse controles de acesso por função, mantenha cópias de segurança atualizadas e registre decisões importantes. Quando houver dúvida, pare a atividade de risco e procure a pessoa responsável.\n\nCanal de contato\nPara dúvidas ou solicitações relacionadas a este documento, utilize ${contact}.\n\nPróxima revisão\nRevise este documento sempre que houver uma mudança relevante na operação, nos fornecedores ou nos dados tratados.`,
  };
}

export { seedDocuments };