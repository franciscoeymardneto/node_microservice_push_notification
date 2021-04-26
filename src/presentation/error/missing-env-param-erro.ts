export class MissingEnviormentParamError extends Error {
  constructor (paramName: string) {
    super(`Missing eviorment param${paramName}`)
  }
}
