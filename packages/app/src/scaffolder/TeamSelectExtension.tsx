import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension, FieldExtensionComponentProps } from '@backstage/plugin-scaffolder-react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { teamApiRef } from '../services/teamService';
import { useApi } from '@backstage/core-plugin-api';

type Props = FieldExtensionComponentProps<string>;

const TeamSelectComponent = ({ onChange, value }: Props) => {
    const [options, setOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const teamApi = useApi(teamApiRef);

    useEffect(() => {
        const fetchTeam = async () => {
            const list = await teamApi.getAll();

            setOptions(list.teams);
            setLoading(false);
        };

        fetchTeam();
    }, [teamApi]);

    if (loading) {
        return (<CircularProgress />)

    }

    return (
        <FormControl fullWidth>
            <InputLabel>Squad</InputLabel>
            <Select
                id="team"
                value={value}
                label="Selecione o time responsável"
                onChange={(event) => onChange(event.target?.value as string)}
            >
                {options.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export const TeamSelectExtension = scaffolderPlugin.provide(
    createScaffolderFieldExtension({
        name: "TeamSelect",
        component: TeamSelectComponent
    })
);