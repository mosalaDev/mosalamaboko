import electricity from '../assets/electricityIcon.svg';
import carrelage from '../assets/carreaux.svg';
import plumbery from '../assets/plumbery.svg';
import climatisation from '../assets/climatisation.svg';
import fixing from '../assets/fixing.svg';
import montage from '../assets/montage.svg';
import peinture from '../assets/painter.svg';
import describeNeed from '../assets/description.svg';
import selectArtisan from '../assets/select.svg';
import conclude from '../assets/conclude.svg';

import electricityBanner from '../assets/electricityBanner.jpg';
import plomberyBanner from '../assets/plomberyBanner.png';
import furnitureFixerBanner from '../assets/furnitureFixer.png';
import designBanner from '../assets/designer.png';
import conditionerBanner from '../assets/conditioner.png';
import tileBanner from '../assets/tile.png';

import customerService from '../assets/customer_service.png';
import tarif from '../assets/price_list.png';
import hour from '../assets/24h.png';
import waranty from '../assets/waranty.png';
import premium from '../assets/premium_badge.png';


import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAll, getReqStatus } from '../redux/reducers/service';
import { selectAll as selectAllTravaux, getReqStatus as gettravialReqStatus } from '../redux/reducers/travail';
import { selectAll as selectUserReservations, getReqStatus as resReqStatus } from '../redux/reducers/reservations';
import { selectAll as selectUserDevis, getReqStatus as devisReqStatus } from '../redux/reducers/devis';

export const getServiceImage = (service) => {
    switch (service) {
        case 'électricité':
            return electricity;
        case 'plomberie et cuisine':
            return plumbery;
        case 'froid et climatisation':
            return climatisation;
        case 'montage et démontage de meubles':
            return montage;
        case 'Peinture décoration-ébénisterie':
            return peinture;
        case 'carrelage':
            return carrelage;
        case 'fixation d\'objets':
            return fixing;
        default:
            return '';
    }
};

export const useGetServices = () => {
    const data = useSelector(selectAll);
    const reqStatus = useSelector(getReqStatus);
    const [services, setServices] = useState([]);

    useEffect(() => {
        let dpt = { image: "" };
        const dpts = [];
        if (data instanceof Array) {
            data.forEach(d => {
                switch (d.nom_service.toLowerCase()) {
                    case "carrelage":
                        dpt = { image: carrelage, banner: tileBanner, ...d };
                        dpts.push(dpt);
                        break;
                    case "fixation d'objets":
                        dpt = { image: fixing, banner: furnitureFixerBanner, ...d };
                        dpts.push(dpt);
                        break;
                    case "peinture décoration-ébénisterie":
                        dpt = { image: peinture, banner: designBanner, ...d };
                        dpts.push(dpt);
                        break;
                    case "froid et climatisation":
                        dpt = { image: climatisation, banner: conditionerBanner, ...d };
                        dpts.push(dpt);
                        break;
                    case "électricité":
                        dpt = { image: electricity, banner: electricityBanner, ...d };
                        dpts.push(dpt);
                        break;
                    case "montage et démontage de meubles":
                        dpt = { image: montage, banner: furnitureFixerBanner, ...d };
                        dpts.push(dpt);
                        break;
                    case "plomberie et cuisine":
                        dpt = { image: plumbery, banner: plomberyBanner, ...d };
                        dpts.push(dpt);
                        break;
                    default:
                        break;
                }
            });

            setServices(dpts);
        }
    }, [data]);

    return {
        services,
        loading: reqStatus === 'pending'
    };
};

export const useGetUrgentService = () => {
    const { services, loading } = useGetServices();
    const [u, setU] = useState([]);

    useEffect(
        () => {
            if (!loading && services instanceof Array) {
                const urgents = services.sort((a, b) => a.nom_service.localeCompare(b.nom_service)).filter(
                    service => service.gamme_travaux.some(
                        gamme => gamme.travaux.some(
                            travail => travail.categories.some(
                                ct => ct.nom.toLowerCase() === "petits travaux"
                            )
                        )
                    ));
                setU(urgents);
            }
        },
        [loading, services]
    );

    return {
        services: u,
        loading
    };

};

export const useGetServicesSmallWorks = (service) => {
    const [w, setW] = useState([]);

    useEffect(() => {
        const works = service.travails.filter(t => t.categorie_travails.some(c => c.nom.toLowerCase() === 'petits travaux'));
        setW(works);
    }, [service]);

    return w;
};

export const useGetWorks = () => {
    const works = useSelector(selectAllTravaux);
    const reqStatus = useSelector(gettravialReqStatus);
    const [wks, setWks] = useState([]);

    useEffect(() => {
        setWks(works);
    }, [works]);

    return {
        works: wks,
        loading: reqStatus === 'pending',
    };
};

export const departements = [
    {
        name: 'Electricité',
        artisan: 'électricien',
        image: electricity,
        detail: '',
        services: [
            {
                name: 'installation',
                pannes: ['Installation Prise', 'Installation Interrupteur', 'nstallation Disjoncteur monophasé'],
            },
            {
                name: 'dépanage',
                pannes: []
            }, {
                name: 'contrôle de bon fonctionnement',
                pannes: []
            }
        ]
    },
    {
        name: 'Carrelage',
        image: carrelage,
        artisan: 'carreleur',
        detail: '',
        services: [
            {
                name: 'Pose carrelage au sol',
                pannes: ['Entiers - Ancien carrelage à enlever', 'Cassés - Ancien carrelage à enlever']
            },
            {
                name: 'Pose carrelage mural',
                pannes: ['Carreaux entiers sans crépissage', 'Carreaux entiers avec crépissage']
            },
            { name: 'Pose de chape', pannes: [] },
            { name: 'Ponçage marbres et granites', pannes: [] }
        ]
    },
    {
        name: 'Plomberie et cuisine',
        image: plumbery,
        artisan: 'plombier',
        detail: '',
        services: [
            { name: 'Installation douche', pannes: ['Douche complète ordinaire', 'Douche complète luxe'] },
            { name: 'installation chauffe-eau', pannes: ['Chauffe-eau 40 à 60 litres', 'Chauffe-eau 60 à 80 litres'] },
            { name: 'Installation hotte', pannes: [] },
            { name: 'W.C.', pannes: [] },
            { name: 'Robinetterie', pannes: [] }
        ]
    },
    {
        name: 'Froid et climatisation',
        image: climatisation,
        artisan: 'depanneur',
        detail: '',
        services: []
    },
    {
        name: 'Fixations d\'objets',
        image: fixing,
        artisan: 'Fixeur d\'objets',
        detail: '',
        services: []
    },
    {
        name: 'Montage / demontage de meubles',
        image: montage,
        artisan: 'monteur des meubles',
        detail: '',
        services: []
    },
    {
        name: 'Peinture décoration - ébénisterie',
        image: peinture,
        artisan: 'designer',
        detail: '',
        services: []
    },
];

export const communes = [
    {
        name: 'KINSHASA',
        district: 'lukunga',
    },
    {
        name: 'BANDAL',
        district: 'lukunga',
    },
    {
        name: 'BUMBU',
        district: 'funa'
    },
    {
        name: 'BARUMBU',
        district: 'lukunga',
    },
    {
        name: 'GOMBE',
        district: 'lukunga',
    },
    {
        name: 'KALAMU',
        district: 'funa',
    },
    {
        name: 'KASA-VUBU',
        district: 'funa',
    },
    { name: 'KIMBASEKE', district: 'tshangu' },
    { name: 'KINKOLE', district: 'tshangu' },
    { name: 'KINTAMBO', district: 'lukunga' },
    { name: 'KISENSO', district: 'mont amba' },
    { name: 'LEMBA', district: 'mont amba' },
    { name: 'LIMETE', district: 'funa' },
    { name: 'LINGWALA', district: 'lukunga' },
    { name: 'MAKALA', district: 'funa' },
    { name: 'MALUKU', district: 'tshangu' },
    { name: 'MASINA', district: 'tshangu' },
    { name: 'MATETE', district: 'mont amba' },
    { name: 'MONT-NGAFULA', district: 'mont amba' },
    { name: 'N’DJILI', district: 'tshangu' },
    { name: 'N’SELE', district: 'tshangu' },
    { name: 'NGALIEMA', district: 'lukunga' },
    { name: 'NGIRI-NGIRI', district: 'funa' },
    { name: 'SELEMBAO', district: 'funa' }
];

export const helpContents = [
    {
        badge: '1',
        image: describeNeed,
        title: 'Mon problème',
        body: 'Envoyez-nous ce dont vous avez besoin, puis fixez la date et l’heure qui vous conviennent pour vos travaux.'
    },
    {
        badge: '2',
        image: selectArtisan,
        title: 'Ma solution',
        body: 'Votre demande effectuée soit le devis approuvé, nous envoyons le meilleur technicien contenu de vos besoins, en tenant compte de sa spécialité et du lieu d\'intervation.'
    },
    {
        badge: '3',
        image: conclude,
        title: 'Ma satisfaction ',
        body: 'Nos techniciens mettent en avant leur travail. Vous avez ainsi une assurance supplémentaire avant que vos travaux démarre. Mise en relation simple rapide et sécurisée.'
    },
];

export const usualWorks = [
    {
        id: 1,
        title: 'électricité',
    },
    {
        id: 2,
        title: 'Plomberie',
    },
    {
        id: 3,
        title: 'climatisation',
    },
    {
        id: 4,
        title: 'W.C',
    },
    {
        id: 5,
        title: 'Peinture',
    },
    {
        id: 6,
        title: 'Décoration',
    },
    {
        id: 6,
        title: 'Montage/démontage des meubles',
    },
    {
        id: 7,
        title: 'Robinetterie',
    },
];

export const handleChangeWork = (e, selectedWorks, works, setSelectedWorks, setSelectedWorksName) => {
    let ws = selectedWorks;
    let w = e.target.value;

    if (e.target.checked) {
        ws.push(w);
    } else {
        ws = ws.filter(w => w.name !== w);
    }

    const wn = [];
    works.forEach(work => {
        if (ws.some(w => w === work.id)) {
            wn.push(work);
        }
    });

    setSelectedWorks(ws);
    setSelectedWorksName(wn);
};

export const useGetUserHistory = () => {
    const res = useSelector(selectUserReservations);
    const devis = useSelector(selectUserDevis);
    const rReqStatus = useSelector(resReqStatus);
    const dReqStatus = useSelector(devisReqStatus);

    const [data, setData] = useState([]);

    useEffect(() => {
        const d = [...res, ...devis];
        const oD = d.sort((a, b) => {
            if (a.createdAt < b.createdAt) return 1; else return -1;
        });

        setData(oD);
    }, [devis, res]);

    return {
        data,
        loading: rReqStatus === 'loading' || dReqStatus === 'loading'
    };
};

export const ageSlice = [
    { min: 18, max: 29 },
    { min: 30, max: 39 },
    { min: 40, max: "plus" },
];

export const organizations = [
    "Je travaille seul(e), de chez moi",
    "Je travaille dans un atelier",
    "J'ai mon entreprise",
    "Je travaille de temps à temps quand on m'appelle",
    "J'ai ma propre équipe"
];

export const experiences = [
    {
        id: '1',
        name: 'Cette année'
    },
    {
        id: '2',
        name: '2020'
    },
    {
        id: '3',
        name: '2019'
    },
    {
        id: '4',
        name: '2018'
    },
    {
        id: '5',
        name: '2017'
    },
    {
        id: '6',
        name: '2016'
    },
    {
        id: '7',
        name: '2015'
    },
    {
        id: '8',
        name: 'Avant 2015'
    },
];

export const formations = [
    "J'ai fait une auto formation",
    "A l'école sécondaire",
    "A l'université ou dans un institut supérieur",
    "Dans un atelier",
    "Dans un centre de formation",
    "Avec mon père",
    "Autre"
];

export const questions = [
    {
        label: 'Généralité',
        list: [
            { l: '/', q: 'Qui est MOSALAMABOKO ?' },
            { l: '/', q: 'Pourquoi utiliser les services de MOSALAMABOKO ?' },
            { l: '/', q: 'Comment mes données personnelles sont-elles stockées et bien sécurisées ?' },
            { l: '/', q: 'Comment contacter MOSALAMABOKO ?' },
        ]
    },
    {
        label: 'Réservations',
        list: [
            { l: '/', q: 'Comment effectuer une réservation ?' },
            { l: '/', q: 'Comment trouver facilement un technicien pour mes pannes ?' },
            { l: '/', q: 'Quelles sont les autres opérations après la réservation ?' },
            { l: '/', q: 'Comment modifier, reporter ou annuler une réservation ?' },
            { l: '/', q: 'Que faire si je ne suis pas satisfait de la prestation ?' },
            { l: '/', q: 'Que faire en cas de désaccord avec un technicien ?' },
            { l: '/', q: 'Pour quoi je ne reçois pas la confirmation de ma réservation ?' },
        ]
    },
    {
        label: 'Compte d’utilisateur',
        list: [
            { l: '/', q: 'Comment créer un compte d’utilisateur MOSALAMABOKO ?' },
            { l: '/', q: 'Comment modifier les informations sur mon compte ?' },
            { l: '/', q: 'Comment changer mon mot de passe ?' },
            { l: '/', q: 'Je n’arrive pas à accéder à mon compte, que dois- je faire ?' },
        ]
    },
    {
        label: 'Techniciens',
        list: [
            { l: '/', q: 'Employez-vous des techniciens ?' },
            { l: '/', q: 'Comment s’inscrire en tant que technicien sur MOSALAMABOKO ?' },
            { l: '/', q: 'Comment et sur quelle base se fait le recrutement de vos techniciens ?' },
            { l: '/', q: 'Comment annuler mon inscription ?' },
        ]
    },
];

export const frequentQuestions = [
    {
        q: "Qui est Mosala maboko ?",
        r: [`Mosola maboko est une strat-up lancée par la société Gifted hands technology en sigle GHT, spécialisé dans le recrutement, l'évaluation, des techniciens qualifiés et mettant à votre disposition, des hommes et des femmes capables, fiables travaillant dans le domaine de l'artisanat et de la construction, pour l'accomplissement de vos différents travaux   afin de leur retrouver rapidement et facilement pour des travaux de dépannages, réparations et réalisations.`]
    },
    {
        q: "Comment effectuer une réservation ?",
        r: [`Il existe deux types de reservation chez Mosala maboko : la reservation d'un technicien et la reservation d'un service.
        `, `Pour éffectuer une reservation d'un technicien, cliquez sur le bouton "trouver un technicien" se trouvant sur la page d'accueil ou dans votre compte utilisateur si vous êtes connecté.`,
            `Pour effectuer une reservation d'un service, cliquez sur le bouton "reserver une prestation" se trouvant dans la barre de navigation ou dans votre compte utilisateur si vous êtes connecté. `]
    },
    {
        q: "Comment modifier, reporter ou annuler une réservation ?",
        r: [`Si vous souhaitez reporter ou annuler l’intervention, il faut informer MOSALAMABOKO dans les plus brefs délais et, en tout état de cause, avant l’arrivée du technicien. Pour cela, il vous suffit de nous contacter par appel téléphonique, ou de nous adresser un mail à l’adresse suivante : contact@mosalamaboko.com ou encore en Cliquant ici.
        `, `MOSALAMABOKO se charge de transmettre l’annulation de la demande auprès du ou des techniciens affectés à l’Intervention.
        Dans le cas où MOSALAMABOKO est informée de l’annulation de la demande d’Intervention après que le Technicien soit arrivé sur les lieux indiqués par le client, ce dernier est dans l’obligation de l’indemniser pour le déplacement effectué. Une facture faisant figurer le déplacement et le montant payé sera remise à l’Utilisateur une fois le paiement effectué.
        `]
    },
    {
        q: "Que faire si je ne suis pas satisfait de la prestation ?",
        r: [`Votre satisfaction est très importante pour nous. Nous mettons au préalable tout en œuvre pour vous assurer une entière satisfaction. Si malgré tous nos efforts, vous n’êtes tout de même pas satisfait, merci de nous contacter afin de bénéficier le cas échéant de notre garantie de satisfaction : nous revenons gratuitement chez vous.
        `, `Par ailleurs, pour rappel, à l’issue de chaque prestation nous vous invitions à noter votre prestataire.`]
    },
    {
        q: "Pourquoi utiliser les services de MOSALAMABOKO ?",
        r: [`Nous possédons une équipe bien recrutée, formée et qualifiée qui vérifie manuellement toutes les annonces postées avant de les approuver afin d'atteindre les standards de qualité. 
        `, `Nous nous assurons que les interventions des techniciens sont faites avec attention et promptitude et leur encourageons à offrir un service de qualité, des conseils appropriés, une transparence tarifaire ainsi qu’une garantie de satisfaction. Pour ce faire, nous leur faisons signer une charte de qualité, nous avons des Conseillers clients qui suivent l’exécution des travaux et recueille les avis des clients, et faisons jouer une garantie satisfait ou refait dans certains cas.
        Contrairement à d'autres sites, aucun frais d'abonnement ou d'inscription ne sont requis, ce qui signifie que vous ne payez pas lorsque vous souhaitez recevoir des chantiers puisque nous comprenons que vos attentes fluctuent en fonction de votre activité tout au long de l'année.
        `, `Nous vous offrons la possibilité d'être référencé gratuitement dans notre réseau afin de vous aider à promouvoir votre entreprise et ainsi générer plus de revenus. Notre système d'évaluation et de recommandation vous aide à améliorer votre réputation et ainsi gagner aisément plus de chantiers. 
        Notre service client répond à vos attentes et s'assure que vous bénéficiez au maximum des services offerts par MOSALAMABOKO.
        `]
    },
];


export const cancelationReasons = [
    "J'ai fait une erreur",
    "Il y avait une erreur dans ma reservation",
    "Je n'ai pas eu votre appel",
    "Le technicien n'est jamais venu",
    "J'ai trouvé une autre solution à mon problème"
];

export const engagements = [
    {
        image: hour,
        text: ["Service 7j/7", "intervention 24h/24"]
    },
    {
        image: premium,
        text: ["Des techniciens", "qualifiés et fiables"]
    },
    {
        image: waranty,
        text: ["Intervation couverte", "par une assurance"]
    },
    {
        image: tarif,
        text: ["Une tarification", "claire"]
    },
    {
        image: customerService,
        text: ["Service après-vente", "disponible"]
    },
]