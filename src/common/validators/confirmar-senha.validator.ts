import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments
} from 'class-validator';

export function ConfirmarSenha(validationOptions?: ValidationOptions) {

    return function (object: Object, propertyName: string) {

        registerDecorator({
            name: 'confirmarSenha',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {

                    const senha = (args.object as any).senha;

                    return value === senha;
                },
                defaultMessage() {
                    return 'A confirmação de senha não corresponde à senha informada.';
                }
            }
        });
    };
}