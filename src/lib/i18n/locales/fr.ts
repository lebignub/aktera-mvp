// French translations
import type { TranslationKey } from "./nl";

export const fr: Record<TranslationKey, string> = {
  // Navigation
  "nav.dossiers": "Dossiers",
  "nav.templates": "Modèles",
  "nav.settings": "Paramètres",
  "nav.pitch": "Voir le pitch →",

  // Dashboard
  "dashboard.title": "Dossiers",
  "dashboard.subtitle": "Aperçu de vos dossiers immobiliers",
  "dashboard.newDossier": "Nouveau dossier",
  "dashboard.noDossiers": "Aucun dossier",
  "dashboard.noDossiersHint": "Créez votre premier dossier pour commencer",
  "dashboard.dossierCreated": "Dossier \"{address}\" créé",

  // KPI
  "kpi.total": "Total",
  "kpi.complete": "Terminé",
  "kpi.inProgress": "En cours",
  "kpi.new": "Nouveau",

  // Status badges
  "status.complete": "Terminé",
  "status.inProgress": "En cours",
  "status.new": "Nouveau",

  // Dossier detail
  "dossier.documents": "Documents",
  "dossier.selectDocument": "Sélectionnez un document",
  "dossier.verified": "vérifié(s)",
  "dossier.missing": "manquant",

  // Upload & extraction
  "upload.success": "{fileName} téléchargé",
  "extract.success": "Données extraites avec succès",
  "extract.demoComplete": "Extraction démo terminée",
  "extract.demoNoPdf": "Extraction démo terminée (pas de données PDF disponibles)",
  "extract.button": "Lancer l'extraction",
  "extract.extracting": "Extraction en cours...",
  "upload.dropzone": "Glissez un PDF ici",
  "upload.dropzoneOr": "ou",
  "upload.browse": "parcourir",

  // Field verification
  "field.verified": "Champ vérifié",
  "field.edit": "Modifier",
  "field.save": "Enregistrer",
  "field.cancel": "Annuler",

  // Generate compromis
  "generate.button": "Générer le compromis",
  "generate.generating": "Génération...",
  "generate.modalTitle": "Vérification avant génération",
  "generate.ready": "Prêt",
  "generate.missingDoc": "Manquant",
  "generate.templateLabel": "Modèle",
  "generate.disclaimer": "Ce document est généré automatiquement. Vérifiez soigneusement toutes les données avant utilisation. Aktera décline toute responsabilité en cas d'erreur.",
  "generate.fieldsVerified": "{verified}/{total} champs vérifiés",
  "generate.cancel": "Annuler",
  "generate.confirm": "Générer",
  "generate.success": "Compromis généré",
  "generate.error": "Échec de la génération",
  "generate.networkError": "Erreur réseau lors de la génération",

  // Party info
  "party.title": "Parties",
  "party.seller": "Vendeur",
  "party.buyer": "Acquéreur",
  "party.notary": "Notaire",
  "party.name": "Nom",
  "party.firstName": "Prénom",
  "party.lastName": "Nom de famille",
  "party.address": "Adresse",
  "party.postalCode": "Code postal",
  "party.city": "Commune",
  "party.birthDate": "Date de naissance",
  "party.birthPlace": "Lieu de naissance",
  "party.nationalRegister": "Numéro de registre national",
  "party.email": "Adresse e-mail",
  "party.phone": "Téléphone",
  "party.addParty": "Ajouter une partie",
  "party.removeParty": "Supprimer",
  "party.saved": "Données des parties enregistrées",
  "party.office": "Étude",
  "party.notaryName": "Nom du notaire",

  // Templates page
  "templates.title": "Modèles",
  "templates.subtitle": "Gérez vos modèles Word",
  "templates.upload": "Télécharger un modèle",
  "templates.uploaded": "Téléchargé",
  "templates.lastUsed": "Dernière utilisation",
  "templates.delete": "Supprimer",
  "templates.noTemplates": "Aucun modèle",

  // Settings page
  "settings.title": "Paramètres",
  "settings.officeInfo": "Informations du bureau",
  "settings.officeName": "Nom du bureau",
  "settings.email": "Adresse e-mail",
  "settings.logo": "Logo",
  "settings.changeLogo": "Modifier",
  "settings.defaultTemplate": "Modèle par défaut",
  "settings.language": "Langue",
  "settings.save": "Enregistrer",
  "settings.saved": "Paramètres enregistrés",

  // Create dossier modal
  "createDossier.title": "Créer un nouveau dossier",
  "createDossier.address": "Adresse",
  "createDossier.city": "Commune",
  "createDossier.postalCode": "Code postal",
  "createDossier.create": "Créer",
  "createDossier.cancel": "Annuler",

  // Mock banner
  "mock.banner": "Démo — les données sont stockées localement",

  // Create dossier placeholders
  "createDossier.addressPlaceholder": "Rue de l'Église 42",
  "createDossier.cityPlaceholder": "Bruxelles",
  "createDossier.postalCodePlaceholder": "1000",

  // Dossier card / header
  "dossier.back": "Dossiers",
  "dossier.documentsVerified": "{verified}/{total} documents vérifiés",
  "dossier.cardSummary": "{uploaded}/{total} documents · {verified} vérifié(s)",
  "dossier.requiredDocs": "Documents requis",

  // Document status badges
  "docStatus.missing": "Manquant",
  "docStatus.uploaded": "Téléchargé",
  "docStatus.extracting": "Traitement...",
  "docStatus.extracted": "Extrait",
  "docStatus.verified": "Vérifié",

  // Extraction panel
  "extract.aiAnalyzing": "L'IA analyse le document",
  "extract.analyzingHint": "Cela prend généralement quelques secondes...",
  "extract.noFields": "Aucun champ extrait",
  "extract.sourcePage": "Source : page {page}",

  // Upload zone
  "upload.uploading": "Téléchargement...",
  "upload.maxSize": "PDF, max 20 Mo",

  // Source preview
  "source.page": "Page {page}",
  "source.pageOf": "Page {page} sur {total}",
  "source.extraction": "Extraction",
  "source.field": "Champ",
  "source.value": "Valeur",
  "source.source": "Source",
  "source.citation": "Citation",

  // Templates extra
  "templates.noTemplatesHint": "Téléchargez votre premier modèle Word pour commencer",
  "templates.deleted": "Modèle supprimé",
  "templates.saved": "\"{name}\" enregistré",
  "templates.docxOnly": "Seuls les fichiers .docx sont autorisés",
  "templates.dropDocx": "Glissez votre modèle .docx ici",
  "templates.orClick": "ou cliquez pour sélectionner",
  "templates.clickToChange": "Cliquez pour changer",
  "templates.name": "Nom",
  "templates.namePlaceholder": "Ex. CIV Compromis 2024",
  "templates.type": "Type",
  "templates.saveTpl": "Enregistrer",
  "templates.cancelTpl": "Annuler",
  "templates.typeCompromis": "Compromis",
  "templates.typeSamenwerkingsovereenkomst": "Convention de collaboration",
  "templates.typeBod": "Offre",

  // Settings extra
  "settings.subtitle": "Informations du bureau et préférences",
  "settings.sectionOffice": "Bureau",
  "settings.sectionDefaults": "Paramètres par défaut",
  "settings.defaultTemplateLabel": "Modèle par défaut pour la génération",
  "settings.optionCompromis": "CIV Compromis",
  "settings.optionSamenwerkingsovereenkomst": "Convention de collaboration",
  "settings.optionBod": "Offre",

  // Document types
  "docType.epc": "Certificat PEB",
  "docType.bodemattest": "Attestation de sol",
  "docType.kadastrale_legger": "Extrait cadastral",
  "docType.elektrische_keuring": "Contrôle électrique",
  "docType.eigendomsakte": "Acte de propriété",
  "docType.asbestattest": "Attestation amiante",

  // ── Pitch page ──

  // Nav
  "pitch.nav.platform": "Plateforme",
  "pitch.nav.earlyAccess": "Accès anticipé",

  // Hero
  "pitch.hero.tagline": "Pour les agents immobiliers qui préfèrent vendre plutôt qu'administrer",
  "pitch.hero.title1": "Retour à ce que",
  "pitch.hero.title2": "vous faites de mieux.",
  "pitch.hero.title3": "Vendre.",
  "pitch.hero.description": "Vous êtes devenu agent immobilier pour connecter les gens à leur propriété de rêve — pas pour retaper les mêmes données quatre fois. AKTERA prend en charge le travail administratif, pour vous et votre équipe.",
  "pitch.hero.viewDemo": "Voir la démo",

  // Browser mockup
  "pitch.mockup.newDossier": "+ Nouveau dossier",
  "pitch.mockup.complete": "Terminé",
  "pitch.mockup.inProgress": "En cours",
  "pitch.mockup.new": "Nouveau",

  // Problem
  "pitch.problem.label": "Le problème",
  "pitch.problem.title": "Les agents sont des vendeurs. Leur agenda dit autre chose.",
  "pitch.problem.description": "Les mêmes données d'adresse, cadastrales et de propriété sont recopiées manuellement du PDF vers l'offre, de l'offre vers la convention, de la convention vers le compromis. Trois documents, trois fois le même travail. Pendant ce temps, les clients attendent.",
  "pitch.stat1.value": "70–80%",
  "pitch.stat1.label": "du temps de travail est consacré à l'administration — pas aux clients, pas à la vente",
  "pitch.stat2.value": "8/10",
  "pitch.stat2.label": "agents citent la saisie répétée de données comme leur plus grande frustration",
  "pitch.stat3.value": "3–4h",
  "pitch.stat3.label": "de travail administratif par transaction qui ne devrait pas incomber à l'agent",
  "pitch.stat4.value": "0",
  "pitch.stat4.label": "ressaisie manuelle nécessaire pour les champs vérifiés avec AKTERA",

  // Before / After
  "pitch.diff.label": "La différence",
  "pitch.diff.title": "Des heures de copier-coller à un seul clic.",
  "pitch.before.label": "Aujourd'hui",
  "pitch.before.1": "Ouvrir le PEB, lire les données",
  "pitch.before.2": "Copier le cadastre vers Word",
  "pitch.before.3": "Saisir manuellement l'attestation de sol",
  "pitch.before.4": "Remplir le compromis champ par champ",
  "pitch.before.5": "Répéter pour l'offre et la convention",
  "pitch.before.time": "3–4h",
  "pitch.before.timeLabel": "par transaction",
  "pitch.after.label": "Avec AKTERA",
  "pitch.after.1": "Télécharger les documents",
  "pitch.after.2": "L'IA extrait tous les champs",
  "pitch.after.3": "Vérifier avec le score de confiance",
  "pitch.after.4": "Un clic : compromis généré",
  "pitch.after.5": "Retour vers le client",
  "pitch.after.time": "15 min",
  "pitch.after.timeLabel": "par transaction",
  "pitch.flow.subtitle": "Upload → Extract → Verify → Generate",

  // Quotes
  "pitch.quotes.label": "Du terrain — 21 entretiens avec des agents immobiliers belges",

  // How it works
  "pitch.how.label": "Comment ça marche",
  "pitch.how.title": "Saisir une fois. Propager partout.",
  "pitch.step1.title": "Téléchargez vos documents",
  "pitch.step1.description": "Glissez votre PEB, attestation de sol, extrait cadastral, acte de propriété et autres documents du dossier sur la plateforme. Les PDF sont traités directement.",
  "pitch.step2.title": "L'IA extrait — vous vérifiez",
  "pitch.step2.description": "L'IA d'AKTERA lit chaque document et extrait des champs structurés avec des niveaux de confiance. Vous gardez le contrôle : corrigez si nécessaire, confirmez en un clic.",
  "pitch.step3.title": "Générez votre compromis",
  "pitch.step3.description": "Toutes les données vérifiées s'intègrent automatiquement dans votre modèle CIV/CEB. Téléchargez un document Word entièrement rempli, prêt pour le notaire. Zéro ressaisie.",

  // Features
  "pitch.features.label": "Pourquoi AKTERA",
  "pitch.features.title": "Conçu pour la confiance, pas seulement pour la vitesse.",
  "pitch.feature1.title": "La confiance avant tout",
  "pitch.feature1.description": "Chaque champ extrait affiche un niveau de confiance — élevé, moyen ou faible. C'est toujours vous qui décidez, pas la machine. La correction manuelle est toujours possible.",
  "pitch.feature2.title": "Fonctionne avec vos propres modèles",
  "pitch.feature2.description": "AKTERA remplit vos modèles Word CIV/CEB existants — même si votre bureau utilise une version personnalisée. Pas de nouveau format, pas de courbe d'apprentissage. Votre notaire reçoit exactement ce qu'il attend.",
  "pitch.feature3.title": "6 types de documents, un seul dossier",
  "pitch.feature3.description": "PEB, attestation de sol, extrait cadastral, contrôle électrique, acte de propriété, attestation amiante — chacun avec sa propre structure et format, tous traités automatiquement et centralisés dans un seul dossier.",
  "pitch.feature4.title": "S'intègre dans votre workflow existant",
  "pitch.feature4.description": "AKTERA ne remplace rien. Il comble le vide entre Realsmart (collecte de documents) et votre modèle de compromis (remplissage manuel).",

  // Competitive positioning
  "pitch.positioning.label": "Positionnement",
  "pitch.positioning.title": "AKTERA ne concurrence pas. Il comble le vide.",
  "pitch.positioning.description": "Le pont entre la collecte de documents et la rédaction de contrats qui n'existe pas aujourd'hui sur le marché belge. Pas de CRM. Pas d'outil de listing. Purement focalisé.",
  "pitch.table.tool": "Outil",
  "pitch.table.does": "Ce qu'il fait",
  "pitch.table.gap": "Ce qu'il ne fait pas",
  "pitch.whise.does": "CRM, suivi de leads, annonces",
  "pitch.whise.gap": "Pas d'extraction de documents, pas de génération de compromis",
  "pitch.omnicasa.does": "CRM, gestion immobilière",
  "pitch.omnicasa.gap": "Pas d'extraction IA, pas de workflow documentaire",
  "pitch.realsmart.does": "Documents cadastraux, demande d'attestation de sol",
  "pitch.realsmart.gap": "Pas d'extraction, pas de pré-remplissage",
  "pitch.civ.does": "Modèles Word juridiquement validés",
  "pitch.civ.gap": "Zéro automatisation — remplissage purement manuel",
  "pitch.aktera.does": "Pipeline Document → Compromis",
  "pitch.aktera.gap": "Pas un CRM. Pas un outil de listing. Focalisé.",

  // CTA
  "pitch.cta.title": "Plus de temps pour ce qui compte.",
  "pitch.cta.description": "AKTERA est en développement actif avec un nombre sélect d'agences belges. Nous cherchons des agents qui veulent se reconcentrer sur la vente.",
  "pitch.cta.earlyAccess": "Demander un accès anticipé",
  "pitch.cta.viewDemo": "Voir la démo",

  // Footer
  "pitch.footer.rights": "Tous droits réservés.",
  "pitch.footer.contact": "Contact",
};
