import { brand } from '../config/brand';
import { formatBRL } from '../utils/format';
import { FREE_SHIPPING_MIN, SHIPPING_FEE } from '../utils/shipping';

const { company } = brand;

const UPDATED_AT = '17 de outubro de 2026';
const LEGAL_NOTICE =
  'Texto-modelo para demonstração. Antes de publicar uma loja de verdade, ele deve ser revisado por um advogado e adaptado à realidade da empresa.';

// A ordem das chaves define a ordem dos links no menu e no rodapé.
export const pages = {
  'perguntas-frequentes': {
    title: 'Perguntas frequentes',
    group: 'ajuda',
    faq: [
      {
        q: 'Como acompanho meu pedido?',
        a: 'Acesse "Meus pedidos" no topo do site. Lá você vê cada etapa: pedido recebido, pagamento confirmado, em separação, enviado e entregue.',
      },
      {
        q: 'Quais são as formas de pagamento?',
        a: 'Pix, cartão de crédito em até 6x sem juros e boleto bancário.',
        link: { to: '/institucional/pagamentos', label: 'Ver detalhes de pagamento' },
      },
      {
        q: 'Como funciona o frete grátis?',
        a: `Compras a partir de ${formatBRL(FREE_SHIPPING_MIN)} têm frete grátis. Abaixo desse valor, o frete custa ${formatBRL(SHIPPING_FEE)}.`,
      },
      {
        q: 'Qual é o prazo de entrega?',
        a: 'De 5 a 8 dias úteis, contados a partir da confirmação do pagamento.',
        link: { to: '/institucional/entregas-e-prazos', label: 'Ver regras de entrega' },
      },
      {
        q: 'Como troco ou devolvo uma peça?',
        a: 'Você pode desistir da compra em até 7 dias corridos após o recebimento, ou trocar a peça em até 30 dias, com a peça sem uso e com as etiquetas.',
        link: { to: '/institucional/trocas-e-devolucoes', label: 'Ver trocas e devoluções' },
      },
      {
        q: 'Posso cancelar ou alterar meu pedido?',
        a: 'Fale com a gente o quanto antes, informando o número do pedido. Se ele ainda não tiver sido enviado, fazemos o cancelamento ou a alteração do endereço.',
        link: { to: '/contato', label: 'Falar com o atendimento' },
      },
      {
        q: 'Como escolho o tamanho certo?',
        a: 'A página de cada produto mostra os tamanhos disponíveis, e as avaliações de outros clientes costumam trazer dicas de caimento. Se a peça não servir, você pode trocar em até 30 dias.',
      },
      {
        q: 'Como meus dados são tratados?',
        a: 'Usamos seus dados apenas para processar pedidos e atender você. Você pode pedir acesso, correção ou exclusão deles a qualquer momento.',
        link: { to: '/institucional/politica-de-privacidade', label: 'Ler a Política de Privacidade' },
      },
    ],
  },

  'trocas-e-devolucoes': {
    title: 'Trocas e devoluções',
    group: 'ajuda',
    notice: LEGAL_NOTICE,
    sections: [
      {
        heading: 'Desistência da compra (arrependimento)',
        paragraphs: [
          'Compras feitas pela internet podem ser desfeitas em até 7 dias corridos após o recebimento, sem precisar justificar. O valor é devolvido integralmente, incluindo o frete (art. 49 do Código de Defesa do Consumidor).',
        ],
      },
      {
        heading: 'Troca por tamanho, cor ou modelo',
        paragraphs: [
          'Você pode trocar a peça em até 30 dias após o recebimento, desde que ela esteja sem uso, sem lavagem e com as etiquetas originais.',
        ],
      },
      {
        heading: 'Produto com defeito',
        paragraphs: [
          'Se a peça chegar com defeito, fale conosco em até 30 dias após o recebimento. Vamos avaliar e oferecer troca, reembolso ou abatimento do preço, conforme o Código de Defesa do Consumidor.',
        ],
      },
      {
        heading: 'Como solicitar',
        list: [
          'Entre em contato pela página Fale conosco e informe o número do pedido.',
          'Aguarde as instruções de envio. A postagem da devolução é gratuita.',
          'Depois que recebermos e conferirmos a peça, fazemos a troca ou o reembolso.',
        ],
      },
      {
        heading: 'Reembolso',
        paragraphs: [
          'O reembolso é feito na mesma forma de pagamento do pedido. No Pix e no boleto, em até 10 dias úteis. No cartão, o estorno pode aparecer em até duas faturas, conforme a operadora.',
        ],
      },
      {
        heading: 'Peças íntimas e de praia',
        paragraphs: [
          'Por higiene, essas peças só podem ser trocadas se estiverem com a etiqueta e o lacre de proteção, exceto em caso de defeito.',
        ],
      },
    ],
  },

  'entregas-e-prazos': {
    title: 'Entregas e prazos',
    group: 'ajuda',
    sections: [
      {
        heading: 'Frete',
        paragraphs: [
          `Compras a partir de ${formatBRL(FREE_SHIPPING_MIN)} têm frete grátis. Abaixo desse valor, o frete custa ${formatBRL(SHIPPING_FEE)}.`,
        ],
      },
      {
        heading: 'Prazo de entrega',
        paragraphs: [
          'O prazo é de 5 a 8 dias úteis e começa a contar depois da confirmação do pagamento. No Pix e no cartão, a confirmação é imediata. No boleto, pode levar até 3 dias úteis após o pagamento.',
        ],
      },
      {
        heading: 'Acompanhamento',
        paragraphs: [
          'Em "Meus pedidos" você vê cada etapa: pedido recebido, pagamento confirmado, em separação, enviado e entregue.',
        ],
      },
      {
        heading: 'Tentativas de entrega',
        paragraphs: [
          'Fazemos até 2 tentativas de entrega no endereço informado. Se ninguém puder receber, o pedido volta para a nossa loja e entramos em contato para combinar o reenvio.',
        ],
      },
      {
        heading: 'Endereço',
        paragraphs: [
          'Confira o endereço e o CEP antes de finalizar a compra. Não é possível alterar o endereço depois que o pedido é enviado.',
        ],
      },
    ],
  },

  pagamentos: {
    title: 'Pagamentos',
    group: 'ajuda',
    sections: [
      {
        heading: 'Formas de pagamento',
        list: [
          'Pix, com aprovação imediata.',
          'Cartão de crédito, em até 6x sem juros.',
          'Boleto bancário, com vencimento em 3 dias.',
        ],
      },
      {
        heading: 'Cartão de crédito',
        paragraphs: [
          'Os dados do cartão são digitados apenas no momento do pagamento e não ficam salvos na nossa loja.',
        ],
      },
      {
        heading: 'Boleto',
        paragraphs: [
          'O pedido só é processado depois da compensação do pagamento, que pode levar até 3 dias úteis. Boletos vencidos são cancelados automaticamente.',
        ],
      },
      {
        heading: 'Segurança',
        paragraphs: [
          'Nunca pedimos senhas ou códigos de verificação por e-mail, telefone ou mensagem. Desconfie de qualquer contato que peça esses dados.',
        ],
      },
    ],
  },

  'sobre-nos': {
    title: 'Sobre nós',
    group: 'institucional',
    sections: [
      {
        heading: 'Nossa história',
        paragraphs: [
          `A ${brand.name} nasceu da ideia de que cada peça de roupa é um fio de uma história maior: a de quem a veste.`,
          'Reunimos moda feminina, masculina, infantil e esportiva em um só lugar, com marcas que combinam conforto, bom caimento e preço justo.',
        ],
      },
      {
        heading: 'O que nos move',
        list: [
          'Qualidade: peças escolhidas com atenção ao tecido e ao acabamento.',
          'Transparência: preços claros, parcelamento sem juros e política de trocas simples.',
          'Cuidado: atendimento que resolve e entrega acompanhada do início ao fim.',
        ],
      },
      {
        heading: 'Sobre este site',
        paragraphs: [
          `A ${brand.name} é um projeto de demonstração: os produtos, as avaliações e os pedidos são fictícios e nenhuma compra real é realizada.`,
        ],
      },
    ],
  },

  'politica-de-privacidade': {
    title: 'Política de Privacidade',
    group: 'institucional',
    updatedAt: UPDATED_AT,
    notice: LEGAL_NOTICE,
    sections: [
      {
        heading: 'Quem é o responsável pelos seus dados',
        paragraphs: [
          `A ${company.legalName}, CNPJ ${company.cnpj}, com sede em ${company.address}, é a controladora dos dados pessoais tratados neste site, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018, a LGPD).`,
        ],
      },
      {
        heading: 'Quais dados coletamos',
        list: [
          'Dados de cadastro e compra: nome, e-mail, CPF, telefone e endereço de entrega.',
          'Dados de pagamento: o pagamento é processado por instituições parceiras. Não guardamos o número completo nem o código de segurança do seu cartão.',
          'Dados de atendimento: o que você escreve quando fala conosco.',
          'Conteúdo que você publica: avaliações de produtos.',
          'Dados de navegação: itens do carrinho, favoritos e, se você permitir, informações de uso do site por meio de cookies.',
        ],
      },
      {
        heading: 'Para que usamos seus dados',
        list: [
          'Processar e entregar seus pedidos, emitir nota fiscal e cuidar de trocas e devoluções (execução de contrato).',
          'Cumprir obrigações legais e fiscais (obrigação legal).',
          'Responder suas solicitações e dúvidas (execução de contrato e legítimo interesse).',
          'Prevenir fraudes e garantir a segurança da loja (legítimo interesse).',
          'Entender como o site é usado e mostrar ofertas relevantes, apenas se você permitir (consentimento).',
        ],
      },
      {
        heading: 'Com quem compartilhamos',
        paragraphs: [
          'Compartilhamos o mínimo necessário com transportadoras (para entregar o pedido), instituições de pagamento (para cobrar), prestadores de tecnologia (como a hospedagem do site) e autoridades, quando houver obrigação legal. Não vendemos seus dados.',
        ],
      },
      {
        heading: 'Por quanto tempo guardamos',
        paragraphs: [
          'Guardamos seus dados pelo tempo necessário para cumprir as finalidades acima e as obrigações legais e fiscais. Depois disso, eles são eliminados ou anonimizados.',
        ],
      },
      {
        heading: 'Seus direitos',
        paragraphs: ['Você pode, a qualquer momento, solicitar:'],
        list: [
          'Confirmação de que tratamos seus dados e acesso a eles.',
          'Correção de dados incompletos, inexatos ou desatualizados.',
          'Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei.',
          'Portabilidade dos dados a outro fornecedor.',
          'Eliminação dos dados tratados com base no seu consentimento.',
          'Informação sobre com quem compartilhamos seus dados.',
          'Revogação do consentimento, quando essa for a base legal.',
        ],
      },
      {
        heading: 'Como exercer seus direitos',
        paragraphs: [
          `Escreva para ${company.privacyEmail}. Respondemos em até 15 dias, conforme a LGPD.`,
        ],
      },
      {
        heading: 'Segurança',
        paragraphs: [
          'Adotamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados, perda e alteração. Nenhum sistema é totalmente invulnerável, por isso também recomendamos que você não compartilhe senhas e códigos de verificação.',
        ],
      },
      {
        heading: 'Crianças e adolescentes',
        paragraphs: [
          'Vendemos roupas infantis, mas as compras são destinadas a adultos. Não coletamos intencionalmente dados de crianças e adolescentes. Se você acredita que isso aconteceu, fale com a gente.',
        ],
      },
      {
        heading: 'Nesta versão de demonstração',
        list: [
          'Carrinho, favoritos, pedidos, avaliações e preferências de cookies ficam salvos apenas no armazenamento do seu navegador e não são enviados a nenhum servidor. O formulário de contato também não envia dados.',
          'Ao digitar o CEP no checkout, ele é enviado ao serviço público ViaCEP para preencher o endereço.',
          'O site carrega fontes (Google Fonts) e imagens de exemplo (Picsum) de serviços externos, que podem receber o seu endereço IP.',
        ],
      },
      {
        heading: 'Encarregado pelo tratamento de dados (DPO)',
        paragraphs: [`Contato: ${company.privacyEmail}.`],
      },
      {
        heading: 'Alterações nesta política',
        paragraphs: ['Podemos atualizar esta política. A data da última versão aparece no topo da página.'],
      },
    ],
  },

  'termos-de-uso': {
    title: 'Termos de Uso',
    group: 'institucional',
    updatedAt: UPDATED_AT,
    notice: LEGAL_NOTICE,
    sections: [
      {
        heading: 'Aceitação',
        paragraphs: ['Ao usar este site, você concorda com estes termos. Se não concordar, não utilize o site.'],
      },
      {
        heading: 'Cadastro e uso',
        paragraphs: [
          'Para comprar, você deve ter 18 anos ou mais e informar dados verdadeiros. É proibido usar o site para fraudes, tentar acessar áreas restritas ou prejudicar o seu funcionamento.',
        ],
      },
      {
        heading: 'Preços e disponibilidade',
        paragraphs: [
          'Preços e estoque podem mudar sem aviso. Se houver erro evidente de preço, avisaremos você antes de confirmar o pedido e você poderá escolher manter ou cancelar sem custo.',
        ],
      },
      {
        heading: 'Pedidos e pagamento',
        paragraphs: [
          'O pedido é confirmado depois da aprovação do pagamento. Pix e cartão têm aprovação imediata, e o boleto depende da compensação. Pedidos com boleto vencido são cancelados automaticamente.',
        ],
      },
      {
        heading: 'Entrega, trocas e devoluções',
        paragraphs: [
          'Os prazos e as regras estão nas páginas Entregas e prazos e Trocas e devoluções, que fazem parte destes termos.',
        ],
      },
      {
        heading: 'Avaliações de clientes',
        paragraphs: [
          'Ao publicar uma avaliação, você declara que ela reflete a sua experiência e autoriza a exibição no site. Podemos remover conteúdo ofensivo, discriminatório, com dados pessoais de terceiros ou sem relação com o produto.',
        ],
      },
      {
        heading: 'Propriedade intelectual',
        paragraphs: [
          'Marcas, textos, imagens e o código do site pertencem à empresa ou a seus parceiros e não podem ser copiados ou reutilizados sem autorização.',
        ],
      },
      {
        heading: 'Limitação de responsabilidade',
        paragraphs: [
          'Nos esforçamos para manter o site no ar, mas não garantimos funcionamento ininterrupto. Isso não afasta a responsabilidade prevista no Código de Defesa do Consumidor.',
        ],
      },
      {
        heading: 'Lei aplicável e foro',
        paragraphs: [
          'Estes termos seguem as leis brasileiras. Eventuais conflitos podem ser resolvidos no foro do domicílio do consumidor.',
        ],
      },
      {
        heading: 'Contato',
        paragraphs: [`Dúvidas sobre estes termos: ${company.email}.`],
      },
    ],
  },

  'politica-de-cookies': {
    title: 'Política de Cookies',
    group: 'institucional',
    updatedAt: UPDATED_AT,
    notice: LEGAL_NOTICE,
    cookieButton: true,
    sections: [
      {
        heading: 'O que são cookies',
        paragraphs: [
          'Cookies são pequenos arquivos que o site guarda no seu navegador. Também usamos tecnologias semelhantes, como o armazenamento local do navegador (localStorage), que seguem as mesmas regras desta política.',
        ],
      },
      {
        heading: 'Como usamos',
        list: [
          'Necessários (sempre ativos): guardam o carrinho, os favoritos, os pedidos, as avaliações e a sua escolha sobre cookies. Sem eles o site não funciona.',
          'Análise e desempenho (opcionais): ajudam a entender quais páginas são mais usadas, para melhorar a loja.',
          'Publicidade e marketing (opcionais): permitem mostrar ofertas mais relevantes e medir campanhas.',
        ],
      },
      {
        heading: 'Como gerenciar suas escolhas',
        paragraphs: [
          'Ao entrar no site, você pode aceitar tudo, recusar os cookies opcionais ou personalizar. Você pode mudar de ideia quando quiser em "Preferências de cookies", no rodapé, ou pelo botão abaixo. Também é possível apagar cookies nas configurações do navegador, mas o site pode deixar de funcionar corretamente.',
        ],
      },
      {
        heading: 'Por quanto tempo guardamos sua escolha',
        paragraphs: [
          'Registramos a sua decisão por 12 meses. Depois disso, perguntamos de novo. Também perguntamos de novo se esta política mudar de forma relevante.',
        ],
      },
      {
        heading: 'Nesta versão de demonstração',
        paragraphs: [
          'Este site de demonstração não carrega ferramentas de análise nem de publicidade. As opções opcionais existem para mostrar como a escolha funciona e ficam prontas para quando essas ferramentas forem adicionadas.',
        ],
      },
    ],
  },
};

const linksByGroup = (group) =>
  Object.entries(pages)
    .filter(([, page]) => page.group === group)
    .map(([slug, page]) => ({ label: page.title, to: `/institucional/${slug}` }));

// Usado no menu lateral das páginas de ajuda e no rodapé
export const siteLinkGroups = [
  { title: 'Ajuda', links: [...linksByGroup('ajuda'), { label: 'Fale conosco', to: '/contato' }] },
  { title: 'Institucional', links: linksByGroup('institucional') },
];