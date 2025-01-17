import { Injectable, Type } from '@angular/core';
import { AppParser, RdgParser } from './app-parser';
import {
  AdditionParser,
  AttributeMapParser,
  AttributeParser,
  DamageParser,
  DeletionParser,
  GapParser,
  GenericElemParser,
  LBParser,
  NoteParser,
  ParagraphParser,
  PtrParser,
  SuppliedParser,
  TermParser,
  TextParser,
  VerseParser,
  VersesGroupParser,
  WordParser
} from './basic-parsers';
import { CharParser, GlyphParser, GParser } from './character-declarations-parser';
import { ChoiceParser } from './choice-parser';
import { SicParser, SurplusParser } from './editorial-parsers';
import { GraphicParser, SurfaceParser, ZoneParser } from './facsimile-parser';
import {
  AbstractParser,
  CalendarDescParser,
  CalendarParser,
  CatRefParser,
  ChangeParser,
  ChannelParser,
  ClassCodeParser,
  ConstitutionParser,
  CorrectionParser,
  CorrespActionParser,
  CorrespContextParser,
  CorrespDescParser,
  CreationParser,
  CRefPatternParser,
  DerivationParser,
  DomainParser,
  EditionStmtParser,
  EditorialDeclParser,
  EncodingDescParser,
  ExtentParser,
  FactualityParser,
  FileDescParser,
  HandNoteParser,
  HandNotesParser,
  HyphenationParser,
  InteractionParser,
  InterpretationParser,
  KeywordsParser,
  LanguageParser,
  LangUsageParser,
  ListChangeParser,
  ListTransposeParser,
  NamespaceParser,
  NormalizationParser,
  NotesStmtParser,
  ParticDescParser,
  PreparednessParser,
  ProfileDescParser,
  ProjectDescParser,
  PublicationStmtParser,
  PunctuationParser,
  PurposeParser,
  QuotationParser,
  RefsDeclParser,
  RefStateParser,
  RenditionParser,
  RespParser,
  RespStmtParser,
  RevisionDescParser,
  SamplingDeclParser,
  SegmentationParser,
  SeriesStmtParser,
  SettingDescParser,
  SettingParser,
  SourceDescParser,
  StdValsParser,
  StyleDefDeclParser,
  TagsDeclParser,
  TagUsageParser,
  TextClassParser,
  TextDescParser,
  TitleStmtParser,
  TransposeParser
} from './header-parser';
import {
  AccMatParser,
  AcquisitionParser,
  AdditionalParser,
  AdditionsParser,
  AdminInfoParser,
  AltIdentifierParser,
  BindingDescParser,
  BindingParser,
  CollationParser,
  CollectionParser,
  ConditionParser,
  CustEventParser,
  CustodialHistParser,
  DecoDescParser,
  DecoNoteParser,
  DepthParser,
  DimensionsParser,
  DimParser,
  ExplicitParser,
  FiliationParser,
  FinalRubricParser,
  FoliationParser,
  HandDescParser,
  HeadParser,
  HeightParser,
  HistoryParser,
  IdentifierParser,
  IncipitParser,
  InstitutionParser,
  LayoutDescParser,
  LayoutParser,
  LocusGrpParser,
  LocusParser,
  MsContentsParser,
  MsDescParser,
  MsFragParser,
  MsIdentifierParser,
  MsItemParser,
  MsItemStructParser,
  MsNameParser,
  MsPartParser,
  MusicNotationParser,
  ObjectDescParser,
  OrigDateParser,
  OriginParser,
  OrigPlaceParser,
  PhysDescParser,
  ProvenanceParser,
  RecordHistParser,
  RepositoryParser,
  RubricParser,
  ScriptDescParser,
  SealDescParser,
  SealParser,
  SourceParser,
  SummaryParser,
  SupportDescParser,
  SupportParser,
  SurrogatesParser,
  TypeDescParser,
  TypeNoteParser,
  WidthParser
} from './msdesc-parser';
import {
  NamedEntitiesListParser,
  NamedEntityRefParser,
  OrganizationParser,
  PersonGroupParser,
  PersonParser,
  PlaceParser,
  RelationParser
} from './named-entity-parsers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ParsersDecl(declarations: Array<Type<any>>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (_: any) =>
    class extends _ {
      declarations = declarations;
    };
}

@Injectable({
  providedIn: 'root'
})
@ParsersDecl([
  AbstractParser,
  AccMatParser,
  AcquisitionParser,
  AdditionalParser,
  AdditionParser,
  AdditionsParser,
  AdminInfoParser,
  AltIdentifierParser,
  AppParser,
  AttributeMapParser,
  AttributeParser,
  BindingDescParser,
  BindingParser,
  CalendarDescParser,
  CalendarParser,
  CatRefParser,
  ChangeParser,
  ChannelParser,
  CharParser,
  ChoiceParser,
  ClassCodeParser,
  CollationParser,
  CollectionParser,
  ConditionParser,
  ConstitutionParser,
  CorrectionParser,
  CorrespActionParser,
  CorrespContextParser,
  CorrespDescParser,
  CreationParser,
  CRefPatternParser,
  CustEventParser,
  CustodialHistParser,
  DamageParser,
  DecoDescParser,
  DecoNoteParser,
  DeletionParser,
  DepthParser,
  DerivationParser,
  DimensionsParser,
  DimParser,
  DomainParser,
  EditionStmtParser,
  EditorialDeclParser,
  EncodingDescParser,
  ExplicitParser,
  ExtentParser,
  FactualityParser,
  FileDescParser,
  FiliationParser,
  FinalRubricParser,
  FoliationParser,
  GapParser,
  GenericElemParser,
  GlyphParser,
  GParser,
  GraphicParser,
  HandDescParser,
  HandNoteParser,
  HandNotesParser,
  HeadParser,
  HeightParser,
  HistoryParser,
  HyphenationParser,
  IdentifierParser,
  IncipitParser,
  InstitutionParser,
  InteractionParser,
  InterpretationParser,
  KeywordsParser,
  LanguageParser,
  LangUsageParser,
  LayoutDescParser,
  LayoutParser,
  LBParser,
  ListChangeParser,
  ListTransposeParser,
  LocusGrpParser,
  LocusParser,
  MsContentsParser,
  MsDescParser,
  MsFragParser,
  MsIdentifierParser,
  MsItemParser,
  MsItemStructParser,
  MsNameParser,
  MsPartParser,
  MusicNotationParser,
  NamedEntitiesListParser,
  NamedEntityRefParser,
  NamespaceParser,
  NormalizationParser,
  NoteParser,
  NotesStmtParser,
  ObjectDescParser,
  OrganizationParser,
  OrigDateParser,
  OriginParser,
  OrigPlaceParser,
  ParagraphParser,
  ParticDescParser,
  PersonGroupParser,
  PersonGroupParser,
  PersonParser,
  PhysDescParser,
  PlaceParser,
  PreparednessParser,
  ProfileDescParser,
  ProjectDescParser,
  ProvenanceParser,
  PtrParser,
  PublicationStmtParser,
  PunctuationParser,
  PurposeParser,
  QuotationParser,
  RdgParser,
  RecordHistParser,
  RefsDeclParser,
  RefStateParser,
  RelationParser,
  RenditionParser,
  RepositoryParser,
  RespParser,
  RespStmtParser,
  RevisionDescParser,
  RubricParser,
  SamplingDeclParser,
  ScriptDescParser,
  SealDescParser,
  SealParser,
  SegmentationParser,
  SeriesStmtParser,
  SettingDescParser,
  SettingParser,
  SicParser,
  SourceDescParser,
  SourceParser,
  StdValsParser,
  StyleDefDeclParser,
  SummaryParser,
  SuppliedParser,
  SupportDescParser,
  SupportParser,
  SurfaceParser,
  SurplusParser,
  SurrogatesParser,
  TagsDeclParser,
  TagUsageParser,
  TermParser,
  TextClassParser,
  TextDescParser,
  TextParser,
  TitleStmtParser,
  TransposeParser,
  TypeDescParser,
  TypeNoteParser,
  VerseParser,
  VersesGroupParser,
  WidthParser,
  WordParser,
  ZoneParser
])
export class XMLParsers {}
