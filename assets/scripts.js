'use strict';

const monthData = {
  0: {
    month: 'Janeiro',
    days: 31,
    message: 'Um ano novo cheinho de saúde para a Alice! ✨',
  },
  1: {
    month: 'Fevereiro',
    days: 28,
    message: 'O mês do amor e de muitas gotinhas de saúde! ❤️',
  },
  2: {
    month: 'Março',
    days: 31,
    message: 'A primavera chega com o sorriso da Alice! 🌸',
  },
  3: {
    month: 'Abril',
    days: 30,
    message: 'Mil sorrisos e muita vitalidade para a nossa menina! ☁️',
  },
  4: {
    month: 'Maio',
    days: 31,
    message: 'Mês das flores e da nossa flor mais bela, a Alice! 🌺',
  },
  5: {
    month: 'Junho',
    days: 30,
    message: 'Dias de sol e muita energia para crescer feliz! ☀️',
  },
  6: {
    month: 'Julho',
    days: 31,
    message: 'Férias, sol e saúde para a pequena Alice! 🍦',
  },
  7: {
    month: 'Agosto',
    days: 31,
    message: 'Mês quente e de muita hidratação e vitaminas! 🌊',
  },
  8: {
    month: 'Setembro',
    days: 30,
    message: 'Novas aventuras esperam pela Alice este mês! 🍂',
  },
  9: {
    month: 'Outubro',
    days: 31,
    message: 'Doces sorrisos e muita saúde para a nossa Alice! 🍭',
  },
  10: {
    month: 'Novembro',
    days: 30,
    message: 'Dias aconchegantes e gotinhas protetoras! 🧸',
  },
  11: {
    month: 'Dezembro',
    days: 31,
    message: 'O Natal da Alice com muita saúde e alegria! 🎄',
  },
};

// Column definitions used to build the table header and rows dynamically
// Columns can have either a `subtitle` (string) or `subcolumns` (array of objects)
const tableColumns = [
  {
    icon: '',
    title: '',
    subcolumns: [{ icon: '🛀', title: 'Banho', subtitle: 'dia sim/dia não' }],
  },
  {
    icon: '💦',
    title: 'Gotas',
    subcolumns: [
      {
        icon: '💧',
        title: 'Biogaia',
        subtitle: '5/dia',
      },
      {
        icon: '☀️',
        title: 'Nancare',
        subtitle: '2/dia',
      },
      {
        icon: '💪',
        title: 'Ferro',
        subtitle: '15/dia',
      },
    ],
  },
  {
    icon: '🙌',
    title: 'Massagem',
    subcolumns: [
      {
        icon: '💨',
        title: 'colicas',
        subtitle: 'anti-ciclonicas',
      },
      {
        icon: '🌙',
        title: 'relax',
        subtitle: 'relaxante',
      },
    ],
  },
];

function leapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function selectMonth() {
  const selector = document.getElementById('month-select');
  const option = selector.value;
  const container = document.getElementById('container-table');
  const footer = document.getElementById('footer-actions');
  const statusHeader = document.getElementById('status-header');

  // Resetar todos os "disabled" das opções de meses
  Array.from(selector.options).forEach((option) => {
    option.disabled = false;
  });

  if (!option) {
    // Se não houver mês selecionado, esconde tudo e volta ao estado inicial
    container.classList.add('hidden');
    footer.classList.add('hidden');
    statusHeader.innerHTML = `<p class="text-gray-400 italic text-xs no-print">Selecionar o mês para gerar a tabela de controlo</p>`;
    return;
  }

  // Desabilitar a opção selecionada para evitar re-seleção
  selector.options[selector.selectedIndex].disabled = true;

  const currentYear = new Date().getFullYear();
  let monthDays = monthData[option].days;
  const footerMessage = monthData[option].message;
  const month = monthData[option].month;

  if (month === 'Fevereiro' && leapYear(currentYear)) {
    monthDays = 29;
  }

  document.getElementById('status-header').innerHTML =
    `<p class="text-gray-500 font-bold uppercase tracking-widest text-xs italic leading-none">Controlo de Vitaminas • ${month}</p>`;
  document.getElementById('custom-message').innerText = footerMessage;
  document.getElementById('container-table').classList.remove('hidden');
  document.getElementById('footer-actions').classList.remove('hidden');

  generateTable(monthDays);
}

function generateTable(days) {
  const tableHead = document.getElementById('table-head');
  const tableBody = document.getElementById('table-body');

  // Build a two-row header to support columns with `subcolumns`.
  // First row contains the parent headers (some may span multiple subcolumns),
  // second row contains the subcolumn headers (only for columns that define them).
  let firstRow = '<tr class="text-pink-600 border-b border-pink-100">';
  firstRow +=
    '<th class="py-1 px-2 w-20 text-md align-middle" rowspan="2">Dia</th>';
  tableColumns.forEach((col) => {
    if (
      col.subcolumns &&
      Array.isArray(col.subcolumns) &&
      col.subcolumns.length > 0
    ) {
      firstRow += `<th class="py-1 px-2 text-center align-middle" colspan="${col.subcolumns.length}">`;
      firstRow += `<div class="text-md font-bold">${col.icon} ${col.title}</div>`;
      firstRow += `</th>`;
    } else {
      firstRow += `<th class="py-1 px-2 text-center align-middle" rowspan="2">`;
      firstRow += `<div class="text-md font-bold">${col.icon} ${col.title}</div>`;
      if (col.subtitle) {
        firstRow += `<div class="text-[9px] text-pink-400 font-normal leading-none">(${col.subtitle})</div>`;
      }
      firstRow += `</th>`;
    }
  });
  firstRow += '</tr>';

  let secondRow = '<tr class="text-pink-600 border-b border-pink-100">';
  tableColumns.forEach((col) => {
    if (
      col.subcolumns &&
      Array.isArray(col.subcolumns) &&
      col.subcolumns.length > 0
    ) {
      col.subcolumns.forEach((sub) => {
        const sTitle = sub && sub.title ? sub.title : '';
        const sIcon = sub && sub.icon ? sub.icon + ' ' : '';
        const sSubtitle = sub && sub.subtitle ? sub.subtitle : '';
        secondRow += `<th class="py-1 px-2 text-center align-middle">`;
        if (sTitle || sIcon) {
          secondRow += `<div class="text-md font-semibold">${sIcon}${sTitle}</div>`;
        } else {
          secondRow += `<div class="text-md font-semibold">&nbsp;</div>`;
        }
        if (sSubtitle) {
          secondRow += `<div class="text-[9px] text-pink-400 font-normal leading-none">(${sSubtitle})</div>`;
        }
        secondRow += `</th>`;
      });
    }
  });
  secondRow += '</tr>';

  tableHead.innerHTML = firstRow + secondRow;

  // Clear body and generate rows matching header column count
  tableBody.innerHTML = '';
  const paddingClass = 'pt-2';
  for (let i = 1; i <= days; i++) {
    const dayLabel = String(i).padStart(2, '0');
    let cells = `<td class="${paddingClass} px-2 font-bold text-gray-600 text-md row-day-cell">${dayLabel}</td>`;
    tableColumns.forEach((col) => {
      if (
        col.subcolumns &&
        Array.isArray(col.subcolumns) &&
        col.subcolumns.length > 0
      ) {
        col.subcolumns.forEach(() => {
          cells += `<td class="${paddingClass} px-2 text-center row-day-cell"><div class="checkbox-custom"></div></td>`;
        });
      } else {
        cells += `<td class="${paddingClass} px-2 text-center row-day-cell"><div class="checkbox-custom"></div></td>`;
      }
    });
    const row = `<tr class="border-b border-pink-50 hover:bg-pink-50 transition-colors">${cells}</tr>`;
    tableBody.innerHTML += row;
  }
}
