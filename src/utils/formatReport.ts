import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import parseISO from 'date-fns/parseISO';

interface ServerReportProps {
  _id: string;
  title: string;
  name: string;
  imageURL: string;
  createdAt: string;
  description: string;
}

interface Report {
  id: string;
  title: string;
  name: string;
  description: string;
  date: string;
  imageURL: string;
}

export const formatReport = (report: ServerReportProps[]): Report[] => {
  const formatedReport = report.map((reportItem) => {
    return {
      id: reportItem._id,
      title: reportItem.title,
      description: reportItem.description,
      date: format(parseISO(reportItem.createdAt), 'd MMM yy', {
        locale: ptBR,
      }),
      imageURL: reportItem.imageURL,
      name: reportItem.name.toLowerCase(),
    };
  });

  return formatedReport;
};
